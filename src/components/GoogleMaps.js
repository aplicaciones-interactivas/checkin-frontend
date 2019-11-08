import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import TextField from "@material-ui/core/TextField";
import {parse as parseSearch} from 'query-string';

function loadScript(src, position, id) {
    if (!position) {
        return;
    }

    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("id", id);
    script.src = src;
    position.appendChild(script);
}

const autocompleteService = {current: null};

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2)
    }
}));

export default function GoogleMaps(props) {
    const classes = useStyles();
    const [inputValue, setInputValue] = React.useState("");
    const [options, setOptions] = React.useState([]);
    const [selected, setSelected] = React.useState(parseSearch(window.location.search).placeId);
    const [cityInfo, setCityInfo] = React.useState(null);
    const loaded = React.useRef(false);
    let [firstRender, setFirstRender] = React.useState(true);
    let {isHome} = props;
    const apikey = "AIzaSyCr93elOowQMq5CQulQLhXLhsJhMR6BIRY";

    if (typeof window !== "undefined" && !loaded.current) {
        if (!document.querySelector("#google-maps")) {
            loadScript(
                "https://maps.googleapis.com/maps/api/js?key=" + apikey + "&libraries=places",
                document.querySelector("head"),
                "google-maps"
            );
        }

        loaded.current = true;
    }

    const handleChange = event => {
        setInputValue(event.target.value);

    };

    const customFetch = React.useMemo(
        () =>
            throttle((input, callback) => {
                autocompleteService.current.getPlacePredictions(input, callback);
            }, 200),
        []
    );

    React.useEffect(() => {
        if (selected) {
            if (!cityInfo || selected !== cityInfo.formatted_address) {
                fetch('http://localhost:3200/places/details/' + selected,
                    {
                        method: 'GET',
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    }).then(res => res.json())
                    .then(async data => {
                        props.updateParentState(data);
                        if (!isHome && firstRender) {
                            await setInputValue(data.formatted_address);
                        }
                    });
            }
        }
    }, [selected]);


    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === "") {
            setOptions([]);
            return undefined;
        }

        customFetch({input: inputValue}, results => {
            if (active) {
                setOptions(results || []);
            }
        });

        return () => {
            active = false;
        };
    }, [inputValue, customFetch]);

    const preventEnterKey = (ev) => {
        if (ev.keyCode === 13) {
            // Do code here
            ev.preventDefault();
        }
    }

    return (
        <Autocomplete
            getOptionLabel={option => {
                setSelected(option.place_id);
                return option.description;
            }}
            filterOptions={x => x}
            value={(() => {
                return {description: inputValue}
            })()}
            options={options}
            autoComplete
            includeInputInList
            freeSolo
            disableOpenOnFocus
            onKeyDown={preventEnterKey}
            renderInput={params => (
                <TextField
                    align={'left'} justify={'left'}
                    {...params}
                    label="¿A donde vas?"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                />
            )}
            renderOption={option => {
                const matches =
                    option.structured_formatting.main_text_matched_substrings;
                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map(match => [match.offset, match.offset + match.length])
                );

                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            <LocationOnIcon className={classes.icon}/>
                        </Grid>
                        <Grid item xs>
                            {parts.map((part, index) => (
                                <span
                                    key={index}
                                    style={{fontWeight: part.highlight ? 700 : 400}}
                                >
                                {part.text}
                                </span>
                            ))}

                            <Typography variant="body2" color="textSecondary">
                                {option.structured_formatting.secondary_text}
                            </Typography>
                        </Grid>
                    </Grid>
                );
            }}
        />
    );
}

import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

export class Copyright extends React.Component {

    render() {
        return (<Box mt={8}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="/">
                    Check-In
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>);
    }
}

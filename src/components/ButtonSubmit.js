import React from 'react';
import Button from '@material-ui/core/Button';

export default function ButtonSubmit(props){

        return(
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={props.mClass}
                >
                Sign In
            </Button>
        )
    
}

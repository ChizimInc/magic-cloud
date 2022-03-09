import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap';

import { createMainFolder } from '../../actions/cloud'


const LoadingButton = () => {
    const [isLoading, setLoading] = useState(false);
    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isLoading) {
            dispatch(createMainFolder(user))
            setLoading(false)
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    if(user.main_folder){
        return null
    }


    return (
        <div style={{height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

            <Button
                variant="primary"
                disabled={isLoading}
                onClick={!isLoading ? handleClick : null}
                style={{padding: '10px 20px'}}
            >
                {isLoading ? 'Loading…' : 'Get  started for free'}
            </Button>
        </div>
    );
}

export { LoadingButton }


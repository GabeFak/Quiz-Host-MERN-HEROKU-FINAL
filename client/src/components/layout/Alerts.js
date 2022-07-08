import React from 'react';
import { useContext } from 'react';
import AlertContext from '../../context/Alert/AlertContext';

const Alerts = () => {
    const alertContext = useContext(AlertContext);
    return (
            alertContext.alerts.length > 0 && alertContext.alerts.map(alert => (
                <div key={alert.id} className={`alert alert-${alert.type}`}>
                    {alert.msg}
                </div>
            )
        )
    )
};

export default Alerts;
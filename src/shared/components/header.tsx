import * as React from "react";
import {Link} from 'react-router'
import styles from './styles'

import {merge} from './logic'
const bootstrap = require('../scss/bootstrap.scss');

export default class extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return(
            <div style={styles.backgroundColorOne}>
                <nav className={merge([
                        bootstrap.navbar
                    ])}
                    style={styles.background}>
                    <Link className={bootstrap.navbar_brand} style={styles.header} to="/">
                        <span style={styles.headerFont}>Evan Jones</span>
                    </Link>
                </nav>
            </div>
        );
    }
}

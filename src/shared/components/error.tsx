import * as React from "react";
import {Link} from 'react-router'
import styles from './styles'
import {wordpress} from '../fetch'

export default class extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: wordpress().error
        }
    }
    render() {
        return(
            <div style = {styles.body}>
                <div style={styles.absCenter}>
                    <div style={styles.backgroundColorSix}>
                        <div style={styles.background}>
                            {this.state.data.post_content}
                            <br/>
                            <Link to="/">Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

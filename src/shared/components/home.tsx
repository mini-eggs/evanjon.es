import * as React from "react";
import {wordpress} from '../fetch'
import HtmlComp from './html'
import styles from './styles'

export default class extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        let wp : any = wordpress();
        this.state = {
            data:wp.homepage
        }
    }
    render() {
        return(
            <div>
                <HtmlComp data={this.state.data}/>
            </div>
        );
    }
}

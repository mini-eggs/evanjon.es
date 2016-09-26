import * as React from "react";
import HtmlComp from './html'
import CommentsComp from './commentContainer'
import styles from './styles'
import {matchPage} from './logic'

export default class extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data:matchPage(this.props.location.pathname),
            type: this.props.location.pathname.split('/')[1],
        };
    }
    componentWillReceiveProps(nextProps:any){
        this.setState({
            data:matchPage(nextProps.location.pathname),
            type: nextProps.location.pathname.split('/')[1],
        });
    }
    render() {
        return(
            <div>
                <HtmlComp data={this.state.data}/>
                <div style = {styles.spacer}/>
                {
                    this.props.location.pathname.indexOf('/posts/') > -1 ?
                        <CommentsComp data={this.state.data} /> :
                        <div></div>
                }
            </div>
        );
    }
}

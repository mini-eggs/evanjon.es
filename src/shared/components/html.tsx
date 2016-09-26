import * as React from "react";
import styles from './styles'

export default class extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: props.data
        }
    }
    componentDidMount(){
        window.scrollTo(0, 0);
    }
    componentWillReceiveProps(nextProps:any){
        this.setState({data:nextProps.data});
        window.scrollTo(0, 0);
    }
    render() {
        return(
            <div style={styles.backgroundColorFive}>
                <div style={styles.background}>
                    <div style={styles.html}>
                        <div dangerouslySetInnerHTML={{__html: this.state.data.post_content}}/>
                    </div>
                </div>
            </div>
        );
    }
}

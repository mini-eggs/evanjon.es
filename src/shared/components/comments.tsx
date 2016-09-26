import * as React from "react"
import styles from './styles'

export default class extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            item:props.data,
            comments:props.comments
        }
    }
    componentWillReceiveProps(nextProps:any){
        this.setState({
            item:nextProps.data,
            comments:nextProps.comments
        });
    }
    render() {
        return(
            <div style={styles.commentContainer}>
                {
                    this.state.comments.reverse().map((item:any,i:number)=>{
                        return <div key={i} style={styles.comment}>
                            <span style={styles.commentHeader}>{item.comment_author}</span>
                            <br/>
                            <span style={styles.commentBody}>{item.comment_content}</span>
                        </div>
                    })
                }
            </div>
        );
    }
}

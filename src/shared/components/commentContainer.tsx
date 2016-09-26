import * as React from "react"
import styles from './styles'
import PostCommentComp from './postComment'
import CommentChainComp from './comments'
import {wordpress} from '../fetch'

const filterComments = function (contentId:number, comments:any) :any {
    let filteredComments:any = [];
    for(let e=0;e<comments.length;e++){
        if(parseInt(comments[e].comment_post_ID) == contentId) {
            filteredComments.push(comments[e]);
        }
    }
    return filteredComments;
};

export default class extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            item:props.data,
            comments:filterComments(parseInt(props.data.ID), wordpress().comments)
        }
    }
    componentWillReceiveProps(nextProps:any){
        this.setState({
            item:nextProps.data,
            comments:filterComments(parseInt(nextProps.data.ID), wordpress().comments)
        });
    }
    componentManualUpdate(nextProps:any){
        nextProps.context.setState({
            item:nextProps.data,
            comments:filterComments(parseInt(nextProps.data.ID), wordpress().comments)
        });
    }
    render() {
        return(
            <div>
                <div style={styles.backgroundColorSeven}>
                    <div style={styles.background}>
                        <PostCommentComp callback={this.componentManualUpdate} context={this} data={this.state.item}/>
                    </div>
                </div>
                {
                    this.state.comments.length > 0 ?
                        <div>
                            <div style = {styles.spacer}/>
                            <div style={styles.backgroundColorEight}>
                                <div style={styles.background}>
                                    <CommentChainComp data={this.state.item} comments={this.state.comments}/>
                                </div>
                            </div>
                        </div>
                        :
                        <div></div>
                }
            </div>
        );
    }
}

import * as React from "react"
import styles from './styles'
import {request, addComment} from '../fetch'

import {merge} from './logic'
const bootstrap = require('../scss/bootstrap.scss');

export default class extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            item:props.data,
            name:'',
            email:'',
            message:'',
            buttonText:'Submit',
            manuallyUpdateParent:props.callback,
            context:props.context
        }
    }
    componentWillReceiveProps(nextProps:any){
        this.setState({item:nextProps.data});
    }
    postComment(event:any) {
        if(this.state.name.length>0 && this.state.email.length>0 && this.state.message.length>0) {
            let self = this;
            request('postComment', {
                name: this.state.name,
                email: this.state.email,
                message: this.state.message,
                id:this.state.item.ID
            }).then((data: any) => {
                addComment(data);
                self.state.manuallyUpdateParent({data:self.state.item, context:self.state.context});
                self.setState({ name:'', email:'', message:'' });
                self.success();
            }).catch( (err:any) => {
                console.log(err);
                self.error();
            })
        }
    }
    success(){
        this.setState({buttonText:'Complete'});
        let self = this;
        setTimeout( () => {
            self.setState({buttonText:'Submit'})
        }, 2000);
    }
    error(){
        this.setState({buttonText:'Error'});
        let self = this;
        setTimeout( () => {
            self.setState({buttonText:'Submit'})
        }, 2000);
    }
    handleChange(event:any, type:string){
        let state = this.state;
        state[type] = event.target.value;
        this.setState(state);
    }
    render() {
        return(
            <div>
                <form>
                    <div className={merge([
                            bootstrap.form_group,
                            bootstrap.col_xs_6
                        ])}
                         style={styles.noPaddingLeft}>
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input value={this.state.name}
                               onChange={(e) => this.handleChange(e, 'name')}
                               type="text"
                               className={bootstrap.form_control}
                               id="exampleInputEmail1" />
                    </div>
                    <div className={merge([
                            bootstrap.form_group,
                            bootstrap.col_xs_6
                        ])}
                         style={styles.noPaddingRight}>
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input value={this.state.email} onChange={(e) => this.handleChange(e, 'email')}  type="email" className={bootstrap.form_control} id="exampleInputEmail1" />
                    </div>
                    <div className={bootstrap.form_group}>
                        <label htmlFor="exampleTextarea">Message</label>
                        <textarea value={this.state.message} onChange={(e) => this.handleChange(e, 'message')} className={bootstrap.form_control} id="exampleTextarea" rows="3"/>
                    </div>
                </form>
                <div className={bootstrap.text_xs_center}>
                    <button type="submit"
                            className={merge([bootstrap.btn_primary, bootstrap.btn])}
                            style={styles.submitBtn}
                            onClick={(e) => this.postComment(e)}>
                        {this.state.buttonText}
                    </button>
                </div>
            </div>
        );
    }
}

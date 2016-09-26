import * as React from "react";
import {Link} from "react-router";
import {capitalizeFirstLetter} from './logic'
import {wordpress} from '../fetch'
import styles from './styles'

import {merge} from './logic'
const bootstrap = require('../scss/bootstrap.scss');

export default class extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        let wp : any = wordpress();
        this.state = {
            pages:wp.pages,
            posts:wp.posts,
            count:0,
        }
    }
    list(type:string, items:any) {
        return <div>
            <ul className={merge([
                    bootstrap.nav,
                    bootstrap.nav_pills,
                    bootstrap.nav_stacked
                ])}>
                <li className={bootstrap.nav_item}>
                    <span className={bootstrap.nav_link} style = {styles.noPadding}>{capitalizeFirstLetter(type)}</span>
                </li>
            </ul>
            {items.map( (item:any, i:number) => {
                return <div key={i}>
                    <ul className={merge([
                            bootstrap.nav,
                            bootstrap.nav_pills,
                            bootstrap.nav_stacked
                        ])}>
                        <li className={bootstrap.nav_item}>
                            <Link className={bootstrap.nav_link} style = {styles.noPadding} to={ '/' + type + '/' + item.post_name}>{item.post_title}</Link>
                        </li>
                    </ul>
                </div>
            })}
        </div>
    }
    render() {
        return(
            <div>
                <div style={styles.backgroundColorTwo}>
                    <div className={bootstrap.navbar} style={styles.background}>
                        {this.list('pages', this.state.pages)}
                    </div>
                </div>
                <div style={styles.spacer}></div>
                <div style={styles.backgroundColorThree}>
                    <div className={bootstrap.navbar} style={styles.background}>
                        {this.list('posts', this.state.posts)}
                    </div>
                </div>
            </div>
        );
    }
}

import * as React from "react";
import HeaderComp from './header'
import ForkComp from './fork'
import SidebarComp from './sidebar'
import FooterComp from './footer'
import styles from './styles'

import {merge} from './logic'
const bootstrap = require('../scss/bootstrap.scss');

export default class extends React.Component<any, any> {
	render() {
		return(
			<div>
				<ForkComp/>
				<div style={styles.body}>
					<div className={bootstrap.container}>
						<div style={styles.container}>
							<div className={bootstrap.col_xs_12}>
								<div style={styles.spacer}></div>
								<HeaderComp/>
							</div>
							<div className={ merge([
								bootstrap.col_xs_12,
								bootstrap.col_sm_8,
								bootstrap.pull_xs_right
								]) }>
								<div style={styles.spacer}></div>
								{this.props.children}
							</div>
							<div className={ merge([
								bootstrap.col_xs_12,
								bootstrap.col_sm_4,
								bootstrap.pull_xs_left
								]) }>
								<div style={styles.spacer}></div>
								<SidebarComp/>
							</div>
							<div className={bootstrap.col_xs_12}>
								<div style={styles.spacer}></div>
								<FooterComp/>
								<div style={styles.spacer}></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

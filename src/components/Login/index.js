import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { immutableRenderDecorator, shallowEqualImmutable } from 'react-immutable-render-mixin';
import { Form, Icon, Input, Button, Checkbox } from 'antd'

import * as Api from 'API'

import * as user from 'ACTION/user'
import './index.less'

const FormItem = Form.Item;

// @immutableRenderDecorator 挂载
class Login extends Component {
	constructor(props) {
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	shouldComponentUpdate(nextProps, nextState) {
    	return !shallowEqualImmutable(this.props, nextProps) || !shallowEqualImmutable(this.state, nextState);  
  	}

	componentWillReceiveProps(nextProps) {
		const { user } = nextProps.auth
		const keys = Object.keys(user)

		console.log('user', user)
		if (keys.length != 0) {
			// this.context.router.replace('/person')
		}
	}

	handleSubmit(e) {
		const data = this.props.form.getFieldsValue()

		this.props.form.validateFields((err, values) => {
	      	if (err) return false
	    })
		
		this.props.requestUser(data)
	}

	render() {
		const { getFieldDecorator } = this.props.form

		return(
			<div className="login-from-container">
				<Form className="login-form">
			        <FormItem>
			          	{getFieldDecorator('name', {
			          		initialValue: '',
			            	rules: [{ required: true, message: '请输入用户名！' }],
			          	})(
			            	<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
			          	)}
			        </FormItem>
			        <FormItem>
			          	{getFieldDecorator('password', {
			          		initialValue: '',
			            	rules: [{ required: true, message: '请输入密码！' }],
			          	})(
			            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
			          	)}
			        </FormItem>
			        <FormItem>
			          	<Button 
			          		type="primary" 
			          		className="login-form-button"
			          		loading={this.props.auth.isFetching}
			          		onClick={this.handleSubmit}
			          	>
			          		登录
			          	</Button>
			          	<a className="hidden" href="">注册</a>
			        </FormItem>
			    </Form>
		    </div>
		)
	}
}

Login.PropTypes = {
	auth: PropTypes.object.isRequired
}
Login.contextTypes = {
  	router: PropTypes.object.isRequired,
  	store: PropTypes.object.isRequired
};

Login = Form.create()(Login)

const mapStateToProps = (state) => {
	return {
		auth: state.auth		
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(user, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
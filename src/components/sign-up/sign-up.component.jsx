import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss';
import { selectConfirmPassword, selectDisplayName, selectEmail, selectPassword } from '../../redux/sign-up/sign-up.selectors';
import { signUpChange, signUpStart } from '../../redux/sign-up/sign-up.actions';

const signUpFunction = async (event, props) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword, signUpUser } = props;

    if (password !== confirmPassword) {
      alert("Password doesn't match.");
      return;
    }

    signUpUser({ displayName: displayName, email: email, password: password, confirmPassword: confirmPassword })
}

const signUpChangeFunction = (event, props) => {
  const { name, value } = event.target;
  const { signUpChange } = props;

  signUpChange({ name: name, value: value })
}

const SignUp = (props) => {
  const { displayName, email, password, confirmPassword } = props;
  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={(event) => signUpFunction(event, props)} >
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          onChange={(event) => signUpChangeFunction(event, props)}
          label='Display Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={(event) => signUpChangeFunction(event, props)}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={(event) => signUpChangeFunction(event, props)}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={(event) => signUpChangeFunction(event, props)}
          label='Confirm Password'
          required
        />
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </div>
  )
}

// class SignUp extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       displayName: '',
//       email: '',
//       password: '',
//       confirmPassword: ''
//     };
//   }

//   handleSubmit = async event => {
//     event.preventDefault();

//     const { displayName, email, password, confirmPassword } = this.state;

//     if (password !== confirmPassword) {
//       alert("passwords don't match");
//       return;
//     }

//     try {
//       const { user } = await auth.createUserWithEmailAndPassword(
//         email,
//         password
//       );

//       await createUserProfileDocument(user, { displayName });

//       this.setState({
//         displayName: '',
//         email: '',
//         password: '',
//         confirmPassword: ''
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   handleChange = event => {
//     const { name, value } = event.target;

//     this.setState({ [name]: value });
//   };

//   render() {
//     const { displayName, email, password, confirmPassword } = this.state;
//     return (
//       <div className='sign-up'>
//         <h2 className='title'>I do not have a account</h2>
//         <span>Sign up with your email and password</span>
//         <form className='sign-up-form' onSubmit={this.handleSubmit}>
//           <FormInput
//             type='text'
//             name='displayName'
//             value={displayName}
//             onChange={this.handleChange}
//             label='Display Name'
//             required
//           />
//           <FormInput
//             type='email'
//             name='email'
//             value={email}
//             onChange={this.handleChange}
//             label='Email'
//             required
//           />
//           <FormInput
//             type='password'
//             name='password'
//             value={password}
//             onChange={this.handleChange}
//             label='Password'
//             required
//           />
//           <FormInput
//             type='password'
//             name='confirmPassword'
//             value={confirmPassword}
//             onChange={this.handleChange}
//             label='Confirm Password'
//             required
//           />
//           <CustomButton type='submit'>SIGN UP</CustomButton>
//         </form>
//       </div>
//     );
//   }
// }

const mapStateToProps = createStructuredSelector({
  displayName: selectDisplayName,
  email: selectEmail,
  password: selectPassword,
  confirmPassword: selectConfirmPassword
});

const mapDispatchToProps = dispatch => ({
  signUpUser: (signUp) => dispatch(signUpStart(signUp)),
  signUpChange: (change) => dispatch(signUpChange(change))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

import React from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Email from '@material-ui/icons/Email';
import People from '@material-ui/icons/People';
import Header from '../components/Header/Header';
import HeaderLinks from '../components/Header/HeaderLinks';
import Footer from '../components/Footer/Footer';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import Button from '../components/CustomButtons/Button';
import Card from '../components/Card/Card';
import CardBody from '../components/Card/CardBody';
import CardHeader from '../components/Card/CardHeader';
import CardFooter from '../components/Card/CardFooter';
import CustomInput from '../components/CustomInput/CustomInput';

import styles from '../assets/jss/nextjs-material-kit/pages/loginPage';
import image from '../assets/img/register_user.jpeg';

const useStyles = makeStyles(styles);

const Register_User = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $comfirmPassword: String!
  ) {
    register(
      input: {
        username: $username
        email: $email
        password: $password
        comfirmPassword: $comfirmPassword
      }
    ) {
      token
      user {
        username
        email
        avatar
      }
    }
  }
`;

export default function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
  const [values, setValues] = React.useState({
    username: '',
    email: '',
    password: '',
    comfirmPassword: ''
  });
  const [errors, setErrors] = React.useState({});

  const handleOnChangeValue = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [registerUser, { loading, error }] = useMutation(Register_User, {
    update(_, result) {
      console.log(result);
      Router.push('/dashboard');
    },
    // onError(err) {
    //   setErrors(err.graphQLErrors[0].extensions.exception.errors);
    // },
    variables: values
  });

  const handleOnSubmit = event => {
    event.preventDefault();
    console.log('submit');
    registerUser();
  };

  setTimeout(function() {
    setCardAnimation('');
  }, 700);

  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div>
      <Header
        absolute
        color='transparent'
        brand='The Alumni Network'
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: 'url(' + image + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
      >
        <div className={classes.container}>
          <GridContainer justify='center'>
            <GridItem xs={12} sm={6} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={handleOnSubmit}>
                  <CardHeader color='primary' className={classes.cardHeader}>
                    <h4>Regisger</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href='#pablo'
                        target='_blank'
                        color='transparent'
                        onClick={e => e.preventDefault()}
                      >
                        <i className={'fab fa-twitter'} />
                      </Button>
                      <Button
                        justIcon
                        href='#pablo'
                        target='_blank'
                        color='transparent'
                        onClick={e => e.preventDefault()}
                      >
                        <i className={'fab fa-facebook'} />
                      </Button>
                      <Button
                        justIcon
                        href='#pablo'
                        target='_blank'
                        color='transparent'
                        onClick={e => e.preventDefault()}
                      >
                        <i className={'fab fa-github'} />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Or Be Classical</p>
                  <CardBody>
                    <CustomInput
                      labelText='Username...'
                      id='first'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'text',
                        endAdornment: (
                          <InputAdornment position='end'>
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                      name='username'
                      values={values.username}
                      onChange={handleOnChangeValue}
                    />
                    <CustomInput
                      labelText='Email...'
                      id='email'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'email',
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                      name='email'
                      value={values.email}
                      onChange={handleOnChangeValue}
                    />
                    <CustomInput
                      labelText='Password'
                      id='pass'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'password',
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: 'off'
                      }}
                      name='password'
                      values={values.password}
                      onChange={handleOnChangeValue}
                    />
                    <CustomInput
                      labelText='Confirm Password'
                      id='confirmpass'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'password',
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: 'off'
                      }}
                      name='comfirmPassword'
                      value={values.comfirmPassword}
                      onChange={handleOnChangeValue}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type='submit' simple color='primary' size='lg'>
                      Get started
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}

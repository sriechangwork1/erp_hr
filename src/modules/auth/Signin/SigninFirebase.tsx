'use client';
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import IntlMessages from '@crema/helpers/IntlMessages';
import Box from '@mui/material/Box';
import AppTextField from '@crema/components/AppFormComponents/AppTextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AppInfoView from '@crema/components/AppInfoView';
import { useAuthMethod } from '@crema/hooks/AuthHooks';
import { Fonts } from '@crema/constants/AppEnums';
import { AiOutlineGoogle, AiOutlineTwitter } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
import { BsGithub } from 'react-icons/bs';

const SigninFirebase = () => {
  const { logInWithEmailAndPassword, logInWithPopup } = useAuthMethod();
  const router = useRouter();
  const { messages } = useIntl();

  const onGoToForgetPassword = () => {
    router.push('/forget-password');
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(String(messages['validation.emailFormat']))
      .required(String(messages['validation.emailRequired'])),
    password: yup.string().required(String(messages['validation.passwordRequired'])),
  });

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', mb: 5 }}>
        {/* <Formik
          validateOnChange={true}
          initialValues={{
            username: 'jamel3oy',
            password: '1234',
          }}
          // validationSchema={validationSchema}
          onSubmit={async (data, { setSubmitting }) => {
            setSubmitting(true);
            const res = await signIn('credentials', {
              redirect: false, // ไม่ให้ redirect อัตโนมัติ
              username: data.username,
              password: data.password,
            });
          
            if (res?.ok) {
              router.push('/'); // ล็อกอินสำเร็จ กลับหน้าแรก หรือหน้า dashboard
            } else {
              // ล็อกอินไม่สำเร็จ: แจ้ง error ได้ที่นี่
              alert('Invalid credentials');
            }
          
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form style={{ textAlign: 'left' }} noValidate autoComplete="off">
              <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                <AppTextField
                  placeholder={'Username'}
                  name="username"
                  label={'Username'}
                  variant="outlined"
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                <AppTextField
                  type="password"
                  placeholder={'Password'}
                  label={'Password'}
                  name="password"
                  variant="outlined"
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  mb: { xs: 3, xl: 4 },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox sx={{ ml: -3 }} />
                  <Box
                    component="span"
                    sx={{
                      color: 'grey.500',
                    }}
                  >
                    <IntlMessages id="common.rememberMe" />
                  </Box>
                </Box>
                <Box
                  component="span"
                  sx={(theme) => ({
                    color: theme.palette.primary.main,
                    fontWeight: Fonts.MEDIUM,
                    cursor: 'pointer',
                    display: 'block',
                    textAlign: 'right',
                  })}
                  onClick={onGoToForgetPassword}
                >
                  <IntlMessages id="common.forgetPassword" />
                </Box>
              </Box>

              <div>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  sx={{
                    minWidth: 160,
                    fontWeight: Fonts.REGULAR,
                    fontSize: 16,
                    textTransform: 'capitalize',
                    padding: '4px 16px 8px',
                  }}
                >
                  <IntlMessages id="common.login" />
                </Button>
              </div>
            </Form>
          )}
        </Formik> */}
          <Box
            component="span"
            sx={(theme) => ({
              fontWeight: Fonts.MEDIUM,
              '& a': {
                color: theme.palette.primary.main,
                textDecoration: 'none',
              },
            })}
          >
            <Link href="http://localhost:3000/">
            กรุณาเข้าระบบด้วยหน้า ERPNPU AUTH
            </Link>
          </Box>
      </Box>
      <Box
        sx={{
          color: 'grey.500',
          mb: { xs: 5, md: 7 },
        }}
      >
        <span style={{ marginRight: 4 }}>
          <IntlMessages id="common.dontHaveAccount" />
        </span>
        <Box
          component="span"
          sx={(theme) => ({
            fontWeight: Fonts.MEDIUM,
            '& a': {
              color: theme.palette.primary.main,
              textDecoration: 'none',
            },
          })}
        >
          <Link href="/signup">
            <IntlMessages id="common.signup" />
          </Link>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: theme.palette.background.default,
          mx: { xs: -5, lg: -10 },
          mb: { xs: -6, lg: -11 },
          mt: 'auto',
          py: 2,
          px: { xs: 5, lg: 10 },
        })}
      >
        <Box
          sx={(theme) => ({
            color: theme.palette.text.secondary,
          })}
        >
          <IntlMessages id="common.orLoginWith" /> 
                <a
                  color="primary"
                  onClick={() => signIn('keycloak', {callbackUrl: '/',})}
                >
                  Sign in with Keycloak
                </a>
        </Box>
      </Box>
      <AppInfoView />
    </Box>
  );
};

export default SigninFirebase;

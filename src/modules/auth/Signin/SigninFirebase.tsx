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
import AppImage from '@crema/components/AppImage';
import { useAuthMethod } from '@crema/hooks/AuthHooks';
import { Fonts } from '@crema/constants/AppEnums';
import { AiOutlineGoogle, AiOutlineTwitter } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
import { BsGithub } from 'react-icons/bs';
import { RiLoginCircleLine } from 'react-icons/ri'; // หรือเลือกไอคอนอื่นได้ เช่น FaKey, MdLogin
import Typography from '@mui/material/Typography';

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
      <Box
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          mb: 5,
          mt: 2,
        }}
      >
        <AppImage src="/assets/user/login.png" alt="crema-logo" width={146} height={50} />
        <div>
        <Button
          href="http://localhost:3000/"
          variant="contained"
          color="primary"
          startIcon={<RiLoginCircleLine size={24} />}
          sx={{
            textTransform: 'none',
            fontSize: 16,
            fontWeight: 'bold',
            px: 3,
            py: 1.5,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          ERPNPU AUTH
        </Button>
        </div>
      </Box>

      <AppInfoView />
    </Box>
  );
};

export default SigninFirebase;

import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux';
import Button from '../../components/global-components/Button';
import { useLoginMutation } from '../../services/authenticationService';
import { setCredentials } from '../../store/slices/authSlice';
import style from './style/authentication.module.scss';

export default function Authentication() {
  const [userInputValue, setUserInputValue] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch()
  const bindUserInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUserInputValue(event.target.value)
  }
  const onSubmitClick = async () => {
    try {
      const user = await login({user_name:userInputValue}).unwrap()
      dispatch(setCredentials(user))
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className={style["container"]}>
      <span className={style["welcome"]}>welcome</span>
      <div className={style["avatar-container"]}>
        <Image src="/icons/user.svg" alt='user-avatar' width={40} height={40} />

      </div>
      <div className={style["input-container"]}>
        <div className={style["input-container-text"]}>Choose a username to enter chat.</div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          placeholder="Enter your username"
          value={userInputValue}
          onChange={bindUserInputChange}
          type="text" />
      </div>
      <Button onClick={onSubmitClick} disabled={!userInputValue || isLoading}>Sign In</Button>
    </div>
  )
}

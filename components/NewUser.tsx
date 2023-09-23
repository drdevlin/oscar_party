import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useUserMutation } from '@/lib/mutation';
import { Item } from '@/components/Item';
import { Avatar } from '@/components/Avatar';
import { Pin } from '@/components/Pin';
import { SlideUpTransition } from '@/lib/motion';

import type { PinProps, PinRef } from '@/components/Pin';

import styles from './NewUser.module.css';

export interface NewUserProps {
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
}

/* Creates a new user. */
export const NewUser = ({ onCancel, onSubmit }: NewUserProps) => {
  // Mutations
  const userMutation = useUserMutation();
  
  // State
  const [mode, setMode] = useState<'standby' | 'avatarInput' | 'pinInput'>('standby');
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [pinConfirmation, setPinConfirmation] = useState('');

  // References
  const pinConfirmationRef = useRef<PinRef | null>(null);
    
  // Handlers
  const handleAvatarClick: React.MouseEventHandler<HTMLDivElement> = () => {
    if (mode === 'avatarInput') return;
    setMode('avatarInput');
  };
  
  const handleAvatarInputChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (target.value.length > 2) return;
    if (target.value.length === 1) return;
    setAvatar(target.value);
  }
  
  const handleAvatarInputBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    if (avatar) return;
    setMode('standby');
  }
  
  const handleNameInputChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (target.value.length > 8) return;
    setName(target.value);
  }
  
  const handlePinInputChange: PinProps['onChange'] = (value) => {
    setPin(value);
    // When this pin is complete, shift focus to confirmation.
    if (!Number.isNaN(Number(value))) pinConfirmationRef.current?.focus();
  }
  
  const handlePinConfirmationInputChange: PinProps['onChange'] = (value) => {
    setPinConfirmation(value);
  }
  
  const handleCancelButtonClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setMode('standby');
    setAvatar('');
    setName('');
    setPin('');
    setPinConfirmation('');
    onCancel(event);
  }
  
  const handleSubmitButtonClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (!avatar) return;
    if (!name) return;
    if (!pin) {
      setMode('pinInput');
      return;
    }
    if (Number.isNaN(Number(pin)) || pin !== pinConfirmation) return;
    const body = { avatar, name, pin };
    (async () => {
      await userMutation.mutateAsync({ method: 'POST', body: JSON.stringify(body)});
      setMode('standby');
      setAvatar('');
      setName('');
      setPin('');
      setPinConfirmation('');
      onSubmit(event);
    })();
  }

  return (
    <Item>
      <div className={styles.container}>
        <button className={styles.button} onClick={handleCancelButtonClick}>
          <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
          </svg>
        </button>
        <AnimatePresence mode="popLayout" initial={false}>
          {mode === 'pinInput' ? (
            <SlideUpTransition key="pin">
              <div className={styles.inputFrame}>
                <Pin onChange={handlePinInputChange} description="4-Digit PIN" autoFocus />
                <div className={styles.pinSpacer} />
                <Pin onChange={handlePinConfirmationInputChange} description="Re-Enter PIN" ref={pinConfirmationRef} />
              </div>
            </SlideUpTransition>
          ) : (
            <SlideUpTransition key="name">
              <div className={styles.inputFrame}>
                <div className={styles.avatarFrame}>
                  <Avatar avatar="" />
                  <div
                    className={styles.avatarContent}
                    onClick={handleAvatarClick}
                  >
                    {mode === 'avatarInput' && (
                      <input
                        className={styles.avatarInput}
                        value={avatar}
                        placeholder="🤔"
                        onChange={handleAvatarInputChange}
                        onBlur={handleAvatarInputBlur}
                        autoFocus
                      />
                    )}
                    {mode === 'standby' && '+'}
                  </div>
                </div>
                <input
                  className={styles.nameInput}
                  value={name}
                  placeholder="Name"
                  onChange={handleNameInputChange}
                />
              </div>
            </SlideUpTransition>
          )}
        </AnimatePresence>
        <button className={styles.button} onClick={handleSubmitButtonClick}>
          <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
          </svg>
        </button>
      </div>
    </Item>
  );
};

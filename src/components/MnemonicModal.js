import  React,{useState,useContext} from 'react';
import { Modal, Portal,  Button, TextInput } from 'react-native-paper';
import {Context as AuthContext} from '../context/AuthContext'


const MnemonicModal = ({isModal,change}) => {
    const [mnemonic,setMnemonic]=useState('')
    const {addMnemonic}=useContext(AuthContext)
    return (
        <Portal>
            <Modal  visible={isModal} onDismiss={()=>change(false)} >
               <TextInput label="enter 12 words mnemonic..." value={mnemonic} onChangeText={text=>setMnemonic(text)} />
               <Button 
                onPress={async ()=>{
                    await addMnemonic(mnemonic)
                    alert('mnemonic added succesfully!')
                    change(false)
                }}
               >
                   ADD
               </Button>
            </Modal>       
        </Portal>
            
    )
}

export default MnemonicModal


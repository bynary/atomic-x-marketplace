import * as React from 'react'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import { FormControlLabel, Switch } from '@mui/material'
import { selectIsTest, setNetwork } from 'store/network/networkSlice'

export default function Network(){
  const dispatch = useAppDispatch()
  const isTestNetwork = useAppSelector(selectIsTest)

  const [checked, setChecked] = React.useState<boolean|undefined>(isTestNetwork)

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.checked ? 'test' : 'production'

    setChecked(event.target.checked)
    console.log(`setting network to ${name}`)
    dispatch(setNetwork(name))
  };

  const s = <Switch 
              checked={checked}
              onChange={handleChange}
            />

  return(
    <FormControlLabel control={s} label="Use Test Network" />
  )
}
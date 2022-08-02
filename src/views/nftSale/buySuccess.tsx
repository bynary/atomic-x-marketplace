import * as React from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import { Backdrop, Button, Grid, Typography } from '@mui/material';

export interface buySuccessProps {
    show: boolean,
    onClose?: () => void
}

export default function BuySuccess(props: buySuccessProps) {
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
      if (props.onClose) {
          props.onClose()
      } else {
        setOpen(false);
      }
  }

  React.useEffect(() => {
    setOpen(props.show)
  }, [props.show])

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme: { zIndex: { drawer: number; }; }) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
        >
            <Grid container
                direction="column"
                justifyContent="center"
                alignItems="center">
                <Grid item>
                    <ConfettiExplosion
                        colors={[
                            '#F9DB6D',
                            '#9FBF8F',
                            '#2C85C9',
                            '#D5573B',
                            '#3C1619',
                            '#FFFFFF'
                            ]}
                        particleSize={5}
                        particleCount={300} />
                </Grid>
                <Grid item textAlign="center">
                    <Typography
                        variant="h1"
                        fontFamily="Rajdhani, Sans-serif"
                        sx={{ textShadow: "2px 2px 10px #000000", color: "#F7CA26" }}>
                        Success!
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        fontFamily="Rajdhani, Sans-serif">
                        Your purchase was successful. Thank you!
                    </Typography>
                </Grid>
                <Grid item textAlign="center" marginTop="20px">
                    <Button onClick={handleClose} variant='contained'>Got it</Button>
                </Grid>
            </Grid>
        </Backdrop>
    </div>
  );
}
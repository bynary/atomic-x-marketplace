import { Box, Grid } from "@mui/material"
import Copyright from "./copyright"
import imtbl_logo_light from "assets/images/logo-imtbl-light.svg"
import { Link } from '@mui/material'
import { Twitter } from '@mui/icons-material'

export default function Footer(){
    return (
        <Box sx={{ bgcolor: '#000000', p: 3, borderColor: 'rgba(255,255,255,0.2)', borderStyle: 'solid', borderWidth: '1px 0px 0px 0px' }} component="footer" marginTop="10px" height="110px" position="static">
            <Grid container spacing={1}>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2} textAlign="left">
                    <Grid container>
                        <Grid item xs={12} textAlign="center">
                            <span style={{color:"lightgray",fontSize:"14px"}}>Powered by &nbsp;</span>
                        </Grid>
                        <Grid item xs={12} textAlign="center" paddingTop="2px">                        
                            <Link href="https://immutable.com"><img src={imtbl_logo_light} height="20px" alt="Immutable X Logo" /></Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8} sm={8} md={8} lg={8} xl={8} textAlign="center">
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4} textAlign="right">
                            <Link href="">
                                Terms of Service
                            </Link>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4} textAlign="center">
                            <Link href="">
                                About Us
                            </Link>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4} textAlign="left">
                            <Link href="">
                                <Twitter />
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} textAlign="left">
                            <span style={{fontSize:"14px",textAlign:"left"}}><Copyright /></span>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
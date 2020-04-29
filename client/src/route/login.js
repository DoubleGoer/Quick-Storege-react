import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withStyles,Paper,CircularProgress,Button,Container, Grid } from '@material-ui/core';
import Axios from 'axios';
import './css/login.css'
import Route, { Redirect } from 'react-router-dom'


const styles = theme =>({

    progress: {
      margin: theme.spacing.unit * 2
    },
    btn : {
        marginTop: 20
    },
    box :{
        alignItems: 'center',
        justifyContent:'center'
    }
  
  })
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userid : "",
            pass : "",
            check : 0,
            servermgs : "",
            comple : 0,
            logck : this.props.logcheck,
            loginuser : this.props.loginuser
        }
        this.handleValue = this.handleValue.bind(this);
        this.submitHandle = this.submitHandle.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
    }



    componentDidMount(){
        this.setState(
            {
                logck : 1
            }
        )
    }



    
    // componentWillMount(){
    //       this.timer = setInterval(this.progress,20);
    //      console.log(this.state.customer);
    // }

    // 이름 : Progress
    // 역할 : 로그인 버튼 누름과 동시에 서버와 통신중 대기 상황일때 로딩바
    progress = () =>{
    const {comple} = this.state
    this.setState({comple:comple>=100 ? 0 : comple + 1});
    }

    //이름 : handleValue
    //역할 : Input박스의 데이터 변화를 감지하고 
    //      Name을 통해 해당 state를 찾아 데이터를 넣어줌
    handleValue(e){
        const valchange = {};
        valchange[e.target.name] = e.target.value;
        this.setState(valchange);
    }

    submitHandle(e){
        e.preventDefault();
        this.checkLogin().then((response) =>{
            if(response.data == "ok"){
                this.setState({servermgs : "로그인을 정상적으로 하셨습니다"});
                this.setState({logck : 0});
                window.sessionStorage.setItem('user', this.state.userid);
                this.props.changeUser();
            }else{
                this.setState({servermgs : "아이디 비밀번호 재확인을 부탁드립니다"});
                this.setState({logck : 1})
            }
            this.setState({check:0});
        });
    }

    checkLogin(){
        console.log(this.state.userid);
        this.setState({check:1});
        const url = '/api/login';
        const formData = new FormData();
        formData.append('username',this.state.userid);
        console.log(formData);
        return Axios.post(url,{ username:this.state.userid, pass:this.state.pass});
    }

    render(){
        const { classes } = this.props;
        return(
            <div className="loginmain">
                <Grid className={classes.root} alignItems="center" direction="column" container spacing={3}>
                    <Grid item>
                    <Paper  style={{width:400, height:500, background:"#D8D8D8"}}>
                        <Container className={classes.box}>
                            <form className="logform" onSubmit={this.submitHandle} style={{alignItems:'center', justify:'center'}}>
                            <h1>로그인</h1>
                            <TextField id="outlined-basic" label="UserName" varient="outlined" name="userid" onChange={this.handleValue}></TextField><br/>
                            <TextField type="password" id="outlined-basic" label="PassWord" varient="outlined" name="pass" value={this.state.pass} onChange={this.handleValue}></TextField><br/>
                                {this.state.check ?   <CircularProgress  variant="determinate" value={this.state.comple}></CircularProgress> :
                                    <Button  className={classes.btn} type="submit" color="primary" variant="contained">로그인</Button>
                                }
                            </form>
                            {this.state.logck ?  this.state.servermgs : "" }
                            {/* <Redirect to="/dashboard"/> */}
                        </Container>
                    </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
} 
export default withStyles(styles)(Login);
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import classnames from 'classnames'
//material-ui
import Card, { CardActions, CardContent,CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Dialog,{ DialogActions,  DialogContent,  DialogContentText,  DialogTitle,} from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

//transitions
import Collapse from 'material-ui/transitions/Collapse';
import Slide from 'material-ui/transitions/Slide';

//icons
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import FaceIcon from 'material-ui-icons/Face'
import AddIcon from 'material-ui-icons/Add'
import RestaurantIcon from 'material-ui-icons/Restaurant'
import LocalPizzaIcon from 'material-ui-icons/LocalPizza'
import StoreMallDirectlyIcon from 'material-ui-icons/StoreMallDirectory'
import ScheduleIcon from 'material-ui-icons/Schedule'
import CreateIcon from 'material-ui-icons/Create'
import ClearIcon from 'material-ui-icons/Clear'


//styles
import { MuiThemeProvider, createMuiTheme ,withStyles} from 'material-ui/styles';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey'
import { Divider } from 'material-ui';

// const shops =['ヨンパチ','カレー屋','コンビニ']

const styles = theme => ({
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  flexGrow: {
    flex: ' auto',
  },
  shopCards:{
    backgroundColor:grey[100]
  },
  orders:{
    fontSize:10
  }
});


class App extends Component {
  state=({
      shops:[{
        id:0,
        name:'お店',
        order:'注文'
      },
      {
        id:1,        
        name:'ヨンパチ',
        order:0
      },
      {
        id:2,        
        name:'カレー屋',
        order:0
      },
      {
        id:3,                
        name:'コンビニ',
        order:0
      }],
      orders:[
        {
        id:0,
        shopId:3,
        item:'A弁当',
        name:'ばばぞの',
        expireTime:5,
        dueTime:'12:40',
        edit:false
      },{
        id:1,
        shopId:2,
        item:'B弁当',
        name:'ばばぞの',
        expireTime:5,
        dueTime:'12:40',
        edit:false        
      }
    ]
  })

  // componentWillMount(){
  //   this.setOrderCounts(this.state)    
  // }
  setOrderCounts(state){
   let count =0
   this.state.orders.map(counts=>{
     if(state === counts.shopId){count=count+1}else if(state === 0){count = '注文'}else{null}
    //  console.log(count)
   })
    return count
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Anyone Lunch(beta)</h1>
        </header><br/>
        <div className='Shops' style={{margin:'auto'}}>
        <br/>        
        {this.state.shops.map(shop=>(
         <ShopCardWithStyles 
         key={shop.id} 
         id={shop.id} 
         shopName={shop.name}
          badge={shop.order} 
          orders={this.state.orders} 
          orderCounts={this.setOrderCounts(shop.id)}//set Order counts at right shoulder
          handleAddOrder={(e,i)=>this.handleAddOrder(e,i)} // set order
          />
        ))}<br/>
        {/* <Button className='AddShopButton' raised color='primary' onClick={(e)=>this.handleAddShopButtonClick(e)}>お店を追加する</Button> */}
       </div>
      </div>
    );
  }
  handleAddOrder(e,i){
  this.setState(
    {
      orders:[...this.state.orders,
          {
            id:0,
            shopId:i,
            item:'A弁当',
            name:'ばばぞの',
            expireTime:5,
            dueTime:'12:40',
            edit:true
          }
        
      ]
    }
    
  )
  } 

}

class ShopCard extends Component{
  state=({
    expanded :false,
    open:false,
  })

  handleExpandClick = (e) => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleAddOrder = (e,shopId) =>{
    // this.setState({ open: true });
    this.props.handleAddOrder(e,shopId)

  }

  handleClose = () => {
    this.setState({ open: false });
  };

  Transition = (props)=>{
    return <Slide direction="up" {...props} />;
  }
  
  render(){
    const { classes } = this.props;
    const ExpandButton = this.props.id !== 0 ? <ExpandMoreIcon/> : null
    return( 
    <div>
      <br/>
      <Badge className='badge' badgeContent={this.props.orderCounts} color='accent' >
      <Card className={classes.shopCards} style={{width:370,margin:'auto' }}>
          <CardContent in={this.state.expanded} timeout="auto" unmountOnExit style={{height:40}}>
            <CardActions disableActionSpacing>
              <div className={classes.flexGrow} />
              <div style={{margin:'auto'}}>
                <StoreMallDirectlyIcon style={{verticalAlign:'buttom'}}/>
                {" "} {this.props.shopName} </div>
  　　　　　　　<IconButton
                className={classnames(classes.expand, {[classes.expandOpen]: this.state.expanded,})}
                onClick={(e)=>this.handleExpandClick(classes)}
                aria-expanded={this.state.expanded}
                aria-label="Show more"> 
                {ExpandButton}
              </IconButton>
            </CardActions>
          </CardContent>
            <Collapse in={this.state.expanded}>
              <CardContent>
              {this.props.orders.map(order=>(<Orders order={order} shopId={this.props.id} edit={this.props.edit}/>))}
              </CardContent>
              <Divider/>
              <CardActions style={{textAlign:'center'}}> 
              <OrderForm/>                 
              {/* <Button dense color="primary" onClick={(e)=>this.handleAddOrder(e,this.props.id)}>
              <AddIcon style={{verticalAlign:'middle'}}/>
              注文を追加する
              </Button>  */}
              <br/><br/>
              </CardActions>    
     
            </Collapse>
            <div>
            </div>
      </Card>
      </Badge>
    </div>
    )
  }
}

const ShopCardWithStyles=withStyles(styles)(ShopCard);

class Orders extends Component{ 
  render(){
    if(this.props.shopId===this.props.order.shopId){
      if(this.props.order.edit===false){
        //fixOrder
        return(
          <div>
            <Card>
              <CardContent style={{textAlign:'center'}}>
              <div style={{fontSize:10}}> 
                <FaceIcon style={{verticalAlign:'middle',marginLeft:10}}/>
              {this.props.order.name}{"  "}
                <LocalPizzaIcon style={{verticalAlign:'middle',marginLeft:10}} />
                {this.props.order.item}{"  "}
                <ScheduleIcon style={{verticalAlign:'middle',marginLeft:10}}/>
                {this.props.order.dueTime}{"  "}
                <Button dense color='accent' style={{height:10,fontSize:12,textAlign:'left',marginLeft:10}}>買える！</Button>
                </div>            
              </CardContent>
            </Card>
            <div style={{height:10}}/>
          </div>
        )
      }else{
        return(<EditOrder order={this.props.order}/>) 
      }
    }else{
      return null
    }
  }
}

class EditOrder extends Component{
  render(){
    return(
      <div>
      <Card>
      <CardHeader 
      title={<div style={{fontSize:15}}>注文を記入してください</div>}
      style={{fontSize:'midium'}}
      action={<IconButton><ClearIcon/></IconButton>}/>
        <CardContent style={{textAlign:'center'}}>
        <div style={{fontSize:10}}> 
          <FaceIcon style={{verticalAlign:'middle',marginLeft:10}}/>
              {this.props.order.name}{"  "}<br/>
          <LocalPizzaIcon style={{verticalAlign:'middle',marginLeft:10}} />
               {this.props.order.item}{"  "}
          <ScheduleIcon style={{verticalAlign:'middle',marginLeft:10}}/>
               {this.props.order.dueTime}{"  "}
          <Button dense color='accent' style={{height:10,fontSize:12,textAlign:'left',marginLeft:10}}>内容を確定する</Button>
          </div>            
        </CardContent>
      </Card>
      <div style={{height:10}}/>
    </div>
    )
  }
}

class OrderForm extends Component{
render(){
  return(<div>
    <Card>
    <CardHeader 
      title={<div style={{fontSize:15}}>注文を記入してください</div>}
      style={{fontSize:'midium'}}
    />
    </Card>
  </div>)
}
}
export default App;

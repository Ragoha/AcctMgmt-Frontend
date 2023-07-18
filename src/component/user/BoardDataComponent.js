import { Component } from "react";
import UserService from "../../service/UserService";

class BoardDataComponent extends Component {

    //component는 , react에서 클래스의 형태로 구현할 수 있게 도와줌
    //mount 
    constructor(props){
        super(props);
        this.state={
            boardData: 'BoardData props state in Constructor<<<<<<',
            abc : 'Im ABC'
        };
        console.log("constructor in BoardData start ! ")
    }
    getBoardData(){
        UserService.getBoardData()
        .then((boardData)=>{
            this.setState({boardData});
        }).catch((error)=>{
            console.error("Error in BoardDataComponent-->getBoardData() ",error);
        });
        console.log('getBoardData console test !!!!!');
    }
    componentDidMount(){
        this.getBoardData();
    }
    
    
    render(){
        const {boardData} = this.state;
        return(
            <div>
                BoardDataComponent의 render를 거쳐서 오고있다.
                <div>{boardData} 데이터좀 보자 </div>
              
            </div>
        )
    }
}

export default BoardDataComponent;
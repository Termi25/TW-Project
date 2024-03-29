import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import addNotification from 'react-push-notification'
import './ClaimRequest.css'

const SERVER = 'http://localhost:8080'

function ClaimRequestSent (props) {
  const { item } = props
  const authId=useSelector((state)=>state.authId)
  const [food,setFood]=useState("")
  const [foodOwner,setFoodOwner]=useState("")

    const getOwner = async () => {
        try{
            const response = await fetch(`${SERVER}/claimRequest/owner/${item.id_claim}`)
            const data = await response.json()
            setFoodOwner(data)
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
    }

    const getFood = async () => {
        try{
            const response = await fetch(`${SERVER}/claimRequest/food/${item.id_claim}`)
            const data = await response.json()
            setFood(data)
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
    }

    useEffect(() => {
        try{
            getFood()
            getOwner()
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
    },[authId])

  return (
    <div className='request'>
        <div className='ClaimReqField'>
            Food name : {food.food_name}
        </div>
        <div className='ClaimReqField'>
            Food type : {food.FoodType}
        </div>
        <div className='ClaimReqField'>
            Expiration date : {food.ExpirationDate}
        </div>
        {foodOwner.id_user!==authId ? 
        (<div className='ClaimReqField'>
            Owner of food : {foodOwner.username}
        </div>)
        :(<div/>)}
        <div className='ClaimReqField' id='status'>
            Status : {item.status}
        </div>    
    </div>
  )
}

export default ClaimRequestSent
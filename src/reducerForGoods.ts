import {ListPropsType, ShopListsType} from "./Typisation";
import {v1} from "uuid";

type StateType = ShopListsType
type ActionType = changeTitleForGoodsACType | changeCartStatusACType

let shoplistID_1 = v1();
let shoplistID_2 = v1();

const initialStateForGoods = {
    [shoplistID_1]: [
        {id: v1(), title: 'Milk', expectedPrice: '$1.99', realPrice: '$1.99', inCart: true},
        {id: v1(), title: 'Bread', expectedPrice: '$0.99', realPrice: '$0.89', inCart: true},
        {id: v1(), title: 'Coca-Cola', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
        {id: v1(), title: 'Eggs', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
        {id: v1(), title: 'Cakes', expectedPrice: '$4.99', realPrice: '$6.99', inCart: false},
    ],
    [shoplistID_2]: [
        {id: v1(), title: 'Витамины', expectedPrice: '$0.99', realPrice: '$0.89', inCart: true},
        {id: v1(), title: 'Корм', expectedPrice: '$1.49', realPrice: '$1.49', inCart: true},
        {id: v1(), title: 'Игрушка', expectedPrice: '$2.49', realPrice: '$3.99', inCart: false},
    ]
}
export const reducerForGoods =(state: StateType = initialStateForGoods, action: ActionType)=>{
    switch (action.type) {
        case "CHANGE-TITLE-GOODS":

            return {...state, [action.payload.shopListID]: state[action.payload.shopListID]
                    .map(obj => obj.id === action.payload.goodID
                        ? {...obj, title: action.payload.newTitle}
                        : obj) }
        case "CHANGE-CART-STATUS":

            return {...state, [action.shopListID]: state[action.shopListID]
                    .map(obj => obj.id === action.goodID
                        ? {...obj, inCart: action.checked}
                        : obj) }
    }
}
type changeTitleForGoodsACType = {
    type: "CHANGE-TITLE-GOODS",
    payload: {
        shopListID: string,
        goodID: string,
        newTitle: string
    }
}
const changeTitleForGoodsAC =(shopListID: string, goodID:string, newTitle: string)=> {
    return {
        type: "CHANGE-TITLE-GOODS" as const, //as const не пишем, так как
        payload: {
            shopListID,
            goodID,
            newTitle
        }
    }
}



type changeCartStatusACType = ReturnType<typeof changeCartStatusAC>
const changeCartStatusAC =(shopListID: string, goodID: string, checked: boolean)=> {
    return {
        type: "CHANGE-CART-STATUS" as const,
            shopListID,
            goodID,
            checked
    }
}
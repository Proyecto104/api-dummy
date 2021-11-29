import { Injectable } from '@nestjs/common';
import { Product } from './models/product.model';
import { Reserve } from './models/reserve.model';
import { User, USERTYPE } from './models/user.model';

@Injectable()
export class AppService {

  private usersList: User[] = [
    {
      address: "Av. San Martin 3300",
      email: "savemeal@gmail.com",
      password: "savemeal",
      type: USERTYPE.BUSINESS,
      user: "savemeal",
      businessHours: "9-18hs",
      businessName: "savemeal",
      cuit: "12345645",
      id: 1,
      mobile: "12121212"
    },
    {
      email: "usuario@gmail.com",
      password: "savemeal",
      type: USERTYPE.CONSUMER,
      user: "usuario",
      dni: "543210",
      id: 2,
      mobile: "343434343"
    },
    {
      email: "usuario2@gmail.com",
      password: "savemeal",
      type: USERTYPE.CONSUMER,
      user: "usuario2",
      dni: "789789789",
      id: 3,
      mobile: "546456456"
    }
  ] 
  private productList: Product[] = [{
    detalle: "Cuarto de libra",
    nombre: "Hamburguesa",
    expiracion: "2/12/2021",
    idComercio: 1,
    porciones: 3,
    disponibles: 1,
    id: 1,
    imagen: "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"
  }] 
  private reserveList: Reserve[] = [{
    idComercio: 1,
    prodId: 1,
    userId: 2,
    delivered: false,
    reservationId: 1,
    token: "fruta"
  },
  {
    idComercio: 1,
    prodId: 1,
    userId: 3,
    delivered: true,
    reservationId: 2,
  }] 
  private lastUserId: number = 3;
  private lastProdId: number = 1;
  private lastReserveId: number = 2;

  //USUARIOS
  addUser(newUser: User): User {
    this.lastUserId+=1
    this.usersList.push({...newUser, id:this.lastUserId})
    return this.usersList.find(user=>user.id === this.lastUserId);
  }

  getUser(userId: number): User | string {
    const user = this.usersList.find(user=>user.id === userId)
    return user ? user: 'No encontrado';
  }

  loginUser({username,password}): User | string{
    const user = this.usersList.find(user=>user.user === username)
    if(user && user.password === password){
      return user
    }else{
      return 'No encontrado o contraseña erronea'
    }
  }



  //PRODUCTO
  getProduct(productId: number){
    const tmpProd = this.productList.find(prod=>prod.id === productId)
    console.log(tmpProd)
    return tmpProd ? tmpProd: 'No encontrado';
  }

  registerProduct(prodData: Product){
    this.lastProdId+=1
    this.productList.push({...prodData, id:this.lastProdId, disponibles: prodData.porciones})
    return this.productList.find(prod=>prod.id === this.lastProdId);
  }

  editProduct(editedProd: Product){
    this.productList = this.productList.map(prod=>{
      if(prod.id === editedProd.id){
        return editedProd
      }else{
        return prod
      }
    })
    return editedProd;
  }

  deleteProd(prodId: number){
    const tmpProd = this.getProduct(prodId);
    let err = false;
    this.productList = this.productList.filter((prod)=> prod.id !== prodId)
    console.log(this.productList)
    this.reserveList = this.reserveList.map((res:Reserve)=>{
      if(tmpProd === 'No encontrado'){
        err = true
        return res
      }
      if(res.prodId !== prodId){
        return res
      }
    })
    return err ? 'Error, no encontrado': 'Eliminado';
  }

  //PRODUCTOS
  getAllProducts(){
    let tmpList: any = this.productList;
    tmpList = tmpList.map((prod)=>{
      return {...prod, business: this.getUser(prod.idComercio), imagen: prod.imagen.replace(/[\n\r]/g, '')}
    })
    return tmpList;
  }

  getAllAvailableProducts(){
    return this.getAllProducts().filter((prod)=> prod.disponibles > 0);
  }

  getBusinessProducts(idComercio: number){
    return this.getAllProducts().filter(prod=>prod.idComercio === idComercio)
  }

  getProductImage(idProd: number){
    return this.productList.find(prod=>prod.id === idProd)?.imagen
  }


  //RESERVAS
  getAllReservations(){
    let tmpList: any = this.reserveList
    tmpList = tmpList.map((res:Reserve)=>{
      return {...res, business: this.getUser(res.idComercio), comida: this.getProduct(res.prodId)}
    })
    return tmpList;
  }

  getAllUserReservation(idUser: number){
    return this.getAllReservations().filter(reserve=> reserve.userId === idUser)
  }

  getAllActiveUserReservation(idUser: number){
    return this.getAllReservations().filter(reserve=>(reserve.userId === idUser && !reserve.delivered))
  }

  getAllBusinessReservation(idComercio: number){
    return this.getAllReservations().filter(reserve=> reserve.idComercio === idComercio)
  }

  getAllActiveBusinessReservation(idComercio: number){
    return this.getAllReservations().filter(reserve=> (reserve.idComercio === idComercio && !reserve.delivered))
  }

  getReservation(id: number){
    const reserve = this.getAllReservations().find(reserve=> reserve.reservationId === id)
    return reserve ? reserve: 'No encontrado';
  }

  registerReservation(reservationData: Reserve){
    this.lastReserveId+=1
    this.reserveList.push({...reservationData, reservationId:this.lastReserveId, delivered: false })
    this.productList = this.productList.map((prod:Product)=>{
      if(prod.id === reservationData.prodId){
        return {...prod, disponibles: (prod.disponibles - 1)}
      }else{
        return prod
      }
    })
    return this.getAllReservations().find(res=>res.reservationId === this.lastReserveId);
  }

  registerReservationWithToken(reservationData:Reserve){
    const tokens = ['fruta','ayudar','comida','comunidad']
    return this.registerReservation({...reservationData, token: tokens[Math.floor(Math.random()*tokens.length)]})
  }

  cancelReservation(reserveId: number){
    const tmpReserve = this.getReservation(reserveId);
    let err = false;
    this.reserveList = this.reserveList.filter((res)=> res.reservationId !== reserveId)
    this.productList = this.productList.map((prod:Product)=>{
      if(tmpReserve === 'No encontrado'){
        err = true
        return prod
        }
      if(prod.id === tmpReserve.prodId){
        return {...prod, disponibles: (prod.disponibles + 1)}
      }else{
        return prod
      }
    })
    return err ? 'Error, no encontrado': 'Cancelada';
  }

  deliveredReservation(reservationId: number){
    let found = false
    this.reserveList = this.reserveList.map((res)=> {
      if(res.reservationId !== reservationId){
        return res
      }else{
        found = true
        return {...res, delivered:true}
      }
    })
    return found? 'Entregada': 'No Encontrada'
  }


}

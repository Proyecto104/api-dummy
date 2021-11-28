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
    imagen: "https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$kcXMyjGx/200/200/original?country=ar"
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
      return {...prod, business: this.getUser(prod.idComercio)}
    })
    return tmpList;
  }

  getAllAvailableProducts(){
    return this.getAllProducts().filter((prod)=> prod.disponibles > 0);
  }

  getBusinessProducts(idComercio: number){
    return this.productList.filter(prod=>prod.idComercio === idComercio)
  }

  getProductImage(idProd: number){
    return this.productList.find(prod=>prod.id === idProd)?.imagen
  }


  //RESERVAS
  getAllUserReservation(idUser: number){
    return this.reserveList.filter(reserve=> reserve.userId === idUser)
  }

  getAllActiveUserReservation(idUser: number){
    return this.reserveList.filter(reserve=>(reserve.userId === idUser && !reserve.delivered))
  }

  getAllBusinessReservation(idComercio: number){
    return this.reserveList.filter(reserve=> reserve.idComercio === idComercio)
  }

  getAllActiveBusinessReservation(idComercio: number){
    return this.reserveList.filter(reserve=> (reserve.idComercio === idComercio && !reserve.delivered))
  }

  getReservation(id: number){
    const reserve = this.reserveList.find(reserve=> reserve.reservationId === id)
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
    return this.reserveList.find(res=>res.reservationId === this.lastReserveId);
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

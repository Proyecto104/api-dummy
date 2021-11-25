export interface User {
    id?: number;
    email: string;
    user: string;
    password: string;
    cuit?: string;
    dni?: string;
    businessName?: string;
    address?: string;
    mobile?: string;
    businessHours?: string;
    type: USERTYPE
  }

  export enum USERTYPE{
    BUSINESS= 1,
    CONSUMER= 2
  }
  
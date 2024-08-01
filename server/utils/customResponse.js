export const successResponse = (msg='',result=null) => {
   return {
    success : true,
    msg ,
    result
   }
}

export const errorResponse = (msg='') => {
    return {
     success : false,
     msg ,
    }
 }
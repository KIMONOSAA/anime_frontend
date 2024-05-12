import React from 'react'
import { isAuthenticated } from '../utils/ApiFunction';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children} : {children: React.ReactElement}) {
    

    const auth = isAuthenticated();

    return auth ? (  
        children // 如果已认证，则渲染 children  
      ) : (  
        <Navigate to="/login" replace /> // 如果未认证，则重定向到登录页面  
      );  
}

export default ProtectedRoute
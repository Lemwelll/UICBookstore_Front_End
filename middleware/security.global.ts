export default defineNuxtRouteMiddleware((to, from) => {
    // if (to.params.id === '1') {
    //   return abortNavigation()
    // }

    if (process.client) {

        console.log(to.path);


        if (to.path.indexOf('/admin') == 0) {

          const checkAdminCredentials = JSON.parse(localStorage.getItem('adminLogin') || '{}');

          if (to.path === '/admin' && checkAdminCredentials.adminID) {
            return navigateTo('/admin/dashboard');
          }

          if ((!to.path == '/admin' || to.path == '/reservations' ) && !checkAdminCredentials.adminID) {
            alert('Login first');
            return navigateTo('/admin');
          }

        }
        else {

          const publicRoutes = [
            '/',
            '/login',
            '/sign-up',
            '/forgot-password',
            '/admin'
          ]
      
          const checkCredentials = JSON.parse(localStorage.getItem('studentLogin') || '{}');
          
          if (publicRoutes.includes(to.path) && checkCredentials.studentID) {
            return navigateTo('/home')
          }
  
          if (!publicRoutes.includes(to.path) && !checkCredentials.studentID) {
            alert('Login first!');
            return navigateTo('/')
        }

        }
    
    }


    // In a real app you would probably not redirect every route to `/`
    // however it is important to check `to.path` before redirecting or you
    // might get an infinite redirect loop
    // if (to.path !== '/') {
    //   return navigateTo('/')
    // }
  })
export function NavBar() {
    return (
        <nav className="bg-gradient-to-r from-red-700 via-red-500 to-red-700">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img className="h-10" src="assets/images/Logo_GL_blanco.png" />
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center md:ml-6">
                            <div className="relative ml-3">
                                <div>
                                    <button 
                                        className="flex max-w-xs items-center bg-white rounded-full text-sm" 
                                        id="user-menu-button" 
                                        aria-expanded="false" 
                                        aria-haspopup="true"                    
                                    >
                                        <img className="h-10 w-10 rounded-full" src="assets/images/Logo_Winba.png" />
                                    </button>
                                </div>
                                    <div 
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" 
                                        role="menu" 
                                        aria-orientation="vertical" 
                                        aria-labelledby="user-menu-button" 
                                        tabindex="-1">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Mi perfil</a>

                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Cerrar Sesión</a>
                                    </div>
                                
                                
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium leading-none text-white">Tom Cook</div>
                                <div className="text-xs font-medium leading-none text-gray-100">tom@example.com</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:hidden" id="mobile-menu">
                <div className="border-t border-gray-700 pt-4 pb-3">
                    <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium leading-none text-white">Tom Cook</div>
                            <div className="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
                        </div>
                        
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                        <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Mi Perfil</a>
                        <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Cerrar Sesión</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}
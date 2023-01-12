import { useState } from "react";

function NavBar() {
  const [hiden, setHiden] = useState(false);
  const handleHide = () => {
    setHiden(!hiden);
  };
  return (
    <nav className="bg-gradient-to-r from-red-700 via-red-500 to-red-700">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
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
                    onClick={handleHide}
                  >
                    <img
                      className="h-10 w-10 rounded-full"
                      src="assets/images/Logo_Winba.png"
                    />
                  </button>
                </div>
                {hiden ? (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabindex="-1"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      id="user-menu-item-0"
                    >
                      Mi perfil
                    </a>

                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      id="user-menu-item-2"
                    >
                      Cerrar Sesión
                    </a>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">
                  Tom Cook
                </div>
                <div className="text-xs font-medium leading-none text-gray-100">
                  tom@example.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden" id="mobile-menu">
        <div className="border-t border-gray-700 pt-4 pb-3">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0 bg-white rounded-full">
              <img
                className="h-10 w-10 rounded-full"
                src="assets/images/Logo_Winba.png"
                alt=""
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">
                Tom Cook
              </div>
              <div className="text-sm font-medium leading-none text-gray-100">
                tom@example.com
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1 px-2">
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-white"
            >
              Mi Perfil
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-white"
            >
              Cerrar Sesión
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

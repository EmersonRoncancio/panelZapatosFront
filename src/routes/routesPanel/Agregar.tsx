
export const Agregar = () => {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Agregar Zapato
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    className="space-y-6">
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
                                Nombre
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="text"
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="apellido" className="block text-sm font-medium leading-6 text-gray-900">
                                Apellido
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="text"
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="usuario" className="block text-sm font-medium leading-6 text-gray-900">
                                Usuario
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="text"
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="contraseña" className="block text-sm font-medium leading-6 text-gray-900">
                                Contraseña
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="password"
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="claveAdministrativa" className="block text-sm font-medium leading-6 text-gray-900">
                                Clave Administrativa
                            </label>
                        </div>
                        <div className="mt-2">
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full h-9 justify-center items-center btn btn-primary"
                        >
                            {/* {
                  isPending ?
                    <span className="loading loading-dots loading-md"></span>
                    : <span>Registrar</span>
                } */}
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
            {/* <ToastContainer
          position="top-center" /> */}
        </div>
    )
}

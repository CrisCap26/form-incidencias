// import { Button } from '@nextui-org/button';

// export default function Home() {
//   return (
//     <div className='p-5'>
//       <Button color='primary'>Add task</Button>
//     </div>
//   )
// }
'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, DatePicker } from "@nextui-org/react";
import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { tipoIncidencias, animals } from './data'
import { RangeCalendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
// import {MailIcon} from './MailIcon.jsx';
// import {LockIcon} from './LockIcon.jsx';

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [tipoDeIncidencia, setTipoDeIncidencia] = useState<number | undefined>(undefined);
  const handleSignIn = () => {
    // Aquí puedes manejar el envío de datos
    console.log({ email, password, rememberMe, tipoDeIncidencia });
    // Puedes agregar la lógica para autenticar al usuario aquí
  };
  return (
    <>
      <Button onPress={onOpen} color="primary">Nueva Incidencia</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Crear incidencia</ModalHeader>
              <ModalBody>
                <Select
                  items={tipoIncidencias}
                  label="Tipo de incidencia"
                  placeholder="Selecciona un tipo de incidencia"
                  className="max-w-xs"
                  value={tipoDeIncidencia}
                  onChange={(e) => setTipoDeIncidencia(Number(e.target.value))}
                >
                  {(incidencia) => <SelectItem key={incidencia.key}>{incidencia.label}</SelectItem>}
                </Select>
                {
                  tipoDeIncidencia !== undefined ?
                    tipoDeIncidencia === 1 ?
                      <RangeCalendar
                        aria-label="Date (Min Date Value)"
                        minValue={today(getLocalTimeZone())}
                      />
                      :
                      <DatePicker label="Selecciona fecha" className="max-w-[284px]" />
                    :
                    <></>
                }
                {/* <Input
                  autoFocus
                  // endContent={
                  //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  // }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  // endContent={
                  //   <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  // }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                /> */}
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                    isSelected={rememberMe}
                    onChange={() => setRememberMe((prev) => !prev)}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => { handleSignIn(); onClose(); }}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
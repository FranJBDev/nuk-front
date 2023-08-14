import Center from '@/components/Center';
import Header from '@/components/Header';
import Title from '@/components/Title';

export default function ProductsPage({ products, wishedProducts }) {
  return (
    <>
      <Header />
      <Center>
        <Title>Aviso de Privacidad</Title>
        <h4>Fecha de última actualización: 14 de agosto del 2023</h4>
        <p>
          Nuk se compromete a proteger y respetar tu privacidad. Esta política
          de privacidad describe cómo recopilamos y utilizamos la información
          personal que proporcionas en nuestro sitio web [URL del sitio web]. Al
          utilizar este sitio, aceptas los términos descritos en este aviso de
          privacidad.
        </p>

        <b>Información que recopilamos</b>
        <p>Podemos recopilar y procesar la siguiente información personal:</p>
        <ol>
          <li>
            Información que proporcionas al llenar formularios en nuestro sitio
            web, como tu nombre, dirección de correo electrónico, número de
            teléfono, etc.
          </li>
          <li>
            Detalles de tus visitas al sitio web y los recursos a los que
            accedes, incluyendo, pero no limitado a, datos de tráfico,
            ubicación, registros y otros datos de comunicación.
          </li>
          <li>
            Información que proporcionas al participar en encuestas o concursos
            en línea.
          </li>
          <li>Cualquier otra información que decidas enviarnos.</li>
        </ol>

        <b>Uso de la información</b>
        <p>Utilizamos la información personal que recopilamos para:</p>
        <ol>
          <li>Proporcionar y mejorar nuestros productos y servicios.</li>
          <li>
            Enviar información que hayas solicitado o que consideramos que
            podría ser de tu interés.
          </li>
          <li>
            Administrar concursos, promociones o encuestas en las que hayas
            decidido participar.
          </li>
          <li>
            Personalizar tu experiencia en el sitio web y presentarte contenido
            relevante.
          </li>
          <li>
            Analizar el tráfico del sitio web y comprender cómo los usuarios
            interactúan con nuestro contenido.
          </li>
        </ol>

        <b>Divulgación de información</b>
        <p>
          No compartiremos ni venderemos tu información personal a terceros sin
          tu consentimiento, excepto en los siguientes casos:
        </p>
        <ol>
          <li>Si estamos obligados a hacerlo por ley.</li>
          <li>
            Con proveedores de servicios externos que nos ayudan a operar
            nuestro sitio web y brindar servicios, sujetos a acuerdos de
            confidencialidad.
          </li>
          <li>
            Para proteger los derechos, la propiedad o la seguridad de nombre de
            la empresa o sitio web y sus usuarios.
          </li>
        </ol>

        <b>Tus derechos</b>
        <p>
          Tienes derecho a acceder a la información personal que tenemos sobre
          ti y a solicitar su corrección, actualización o eliminación. Si deseas
          ejercer alguno de estos derechos, por favor contáctanos a través de
          [correo electrónico de Nuk].
        </p>

        <b>Cambios a esta política de privacidad</b>
        <p>
          Nos reservamos el derecho de actualizar esta política de privacidad en
          cualquier momento. Te recomendamos revisar periódicamente esta página
          para estar al tanto de cualquier cambio. Si tienes preguntas o
          inquietudes sobre este aviso de privacidad, no dudes en ponerte en
          contacto con nosotros a través de [correo electrónico de Nuk].
        </p>
      </Center>
    </>
  );
}

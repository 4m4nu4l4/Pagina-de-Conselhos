import "./styles.css"
import comunicacao from "../../assets/imgs/talk.jpg"
import card01 from "../../assets/imgs/friends.avif"
import card02 from "../../assets/imgs/imaginacao.jpg"
import card03 from "../../assets/imgs/plants.avif"

export default function Sobre () {
  return (  
    <>
    <div className="container">
      <p>
      Em um mundo onde muitas pessoas enfrentam desafios diários sem ter a quem recorrer, A WishDaily surge como uma iniciativa altruísta voltada para o bem-estar e apoio mútuo. Este projeto, sem fins lucrativos, tem como objetivo criar uma plataforma acessível e gratuita onde qualquer pessoa pode buscar orientação e compartilhar conselhos sobre uma ampla gama de temas, como saúde mental, relacionamentos, carreira, finanças e bem-estar geral.
      </p>
      <div id="displaytext">
        <div>
          <img src={comunicacao} alt="" />
        </div>
        <div>
          <p id="info">
            A proposta do projeto é simples e eficaz: proporcionar um espaço virtual onde as pessoas possam ajudar umas às outras de forma desinteressada, baseada em empatia e solidariedade. Não há necessidade de criar usuários ou perfis; o acesso à plataforma é direto, permitindo que qualquer pessoa possa deixar ou receber conselhos de maneira anônima e segura. A ideia central é que todos possam contribuir, independentemente de sua experiência ou formação, tornando o projeto uma verdadeira comunidade de apoio mútuo.
          </p>
        </div>
      </div>
      <p>
        O uso da plataforma é intuitivo e acessível. Ao acessar o site, o visitante encontra uma interface amigável onde pode escolher entre duas opções principais: buscar um conselho ou compartilhar um conselho. Para aqueles que buscam orientação, basta selecionar a área de interesse e navegar pelos conselhos já publicados por outros participantes.
      </p>
      <div id="display-cards">
        <div className="cards">
          <img className="card-images" src={card01} alt="" />
        </div>
        <div className="cards">
          <img className="card-images" src={card02} alt="" />
        </div>
        <div className="cards">
          <img className="card-images" src={card03} alt="" />
        </div>
      </div>
      <p>
        Caso o visitante deseje contribuir com sua experiência ou conhecimento, ele pode facilmente deixar um conselho. Para isso, basta acessar a seção "Deixe Seu Conselho", escolher o tema que deseja abordar, e escrever sua mensagem. Não é necessário se identificar.
      </p>
      <p>
        A WishDaily é construído com base na <strong>premissa de que todos têm algo valioso a compartilhar</strong>. Ao oferecer um espaço onde as pessoas podem tanto dar quanto receber ajuda, o projeto visa <strong>fortalecer laços comunitários</strong> e promover a solidariedade em tempos de necessidade. Cada conselho compartilhado é uma pequena contribuição para o bem-estar coletivo, ajudando a construir um ambiente onde todos se sintam apoiados e compreendidos.
      </p>
      <p>
        Além disso, a plataforma incentiva a participação ativa de voluntários que queiram contribuir com a moderação, garantindo que o ambiente permaneça acolhedor e seguro para todos. É um esforço conjunto onde cada voz importa, e onde o apoio mútuo é a base para um impacto positivo na vida de todos os envolvidos.
      </p>
      <p>
        A WishDaily é, acima de tudo, uma demonstração de que o poder da comunidade pode ser uma força transformadora. Através deste projeto, esperamos <strong>oferecer uma rede de apoio genuína e acessível</strong> para qualquer pessoa que precise, <strong>sem barreiras financeiras ou tecnológicas</strong>. Em um mundo cada vez mais conectado, esta é uma oportunidade para usar a tecnologia para o bem comum, promovendo o cuidado e a compaixão em uma escala global.
      </p>
    </div>
    </>
 )
}
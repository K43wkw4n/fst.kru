import { observer } from "mobx-react-lite";
import { Carousel } from "antd";
import { useStore } from "../../store/store";

const contentStyle: React.CSSProperties = {
  height: "700px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#fff",
};

const HomePage = () => {
  const { currentBranch } = useStore().BranchStore;

  console.log("slideShow", JSON.stringify(currentBranch));

  const check =
    currentBranch &&
    currentBranch?.slideShow !== undefined &&
    currentBranch.id !== 0 &&
    currentBranch?.slideShow.length !== 0;

  const data = check ? currentBranch?.slideShow : [1, 2, 3, 4];

  console.log("data :L ", JSON.stringify(!!check));

  return (
    <div style={{ marginLeft: -50, marginRight: -50 }}>
      <Carousel autoplay draggable>
        {data.map((item: any, i: any) => (
          <div key={i}>
            <h3 style={contentStyle}>
              <img
                style={{
                  width: "100%",
                  maxWidth: "100%", // ขนาดรูปภาพจะไม่เกินขนาด container
                  height: "80vh", // ให้รักษาอัตราส่วนของรูปภาพ
                  objectFit: "cover",
                }}
                src={
                  check
                    ? `https://localhost:7203/slideShow/${item.imageName}`
                    : `https://picsum.photos/2400/1500?${i}`
                }
                // src={`https://localhost:7203/slideShow/${item.imageName}`}
              />
            </h3>
          </div>
        ))}
      </Carousel>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
        eveniet veritatis esse minus voluptas fuga iusto temporibus accusantium
        provident ipsam omnis aliquid expedita minima, culpa quidem illum
        dolore, tempore repellendus itaque accusamus quam sint magnam. Quo
        officiis alias tempore at deserunt consequatur hic amet, blanditiis
        omnis delectus qui quas. Ab earum reprehenderit laboriosam aliquam. Quae
        quaerat aperiam quis? Temporibus esse natus fugiat consectetur neque,
        eaque magni dignissimos fugit eius deleniti officiis, doloremque quidem
        corrupti tempore consequuntur distinctio voluptatum omnis adipisci
        blanditiis cum velit quam quae! Nesciunt sit assumenda maxime quibusdam
        odio fuga blanditiis asperiores quod repellat, explicabo delectus
        cupiditate, nisi iure itaque eveniet omnis soluta facere corporis
        reprehenderit porro? Consequuntur nihil saepe suscipit aliquid
        voluptatum quibusdam nam natus adipisci dignissimos, id ducimus veniam
        ipsam, animi velit labore voluptatibus esse doloribus dicta tempora
        reiciendis amet praesentium quisquam facilis. Doloribus accusamus
        voluptatum, consequuntur expedita iusto perspiciatis dolore quas
        corporis quo laboriosam repellat aliquid eos ex, consectetur voluptate
        iure delectus porro, in voluptates ratione culpa. Doloremque natus quae
        illum inventore laudantium? Voluptas, mollitia odit. Perspiciatis
        ratione autem laudantium veniam adipisci! Quia dolore, ullam molestias
        sed itaque quidem voluptate commodi consequatur consequuntur. Dolor
        dolores soluta quidem accusantium excepturi veritatis culpa cumque quia
        eveniet illum nam, impedit necessitatibus similique voluptates quam
        harum nulla. Tempora, consequatur fuga quasi numquam expedita ea
        provident reprehenderit, enim quaerat praesentium iure delectus non
        voluptate quam ipsa? Ab laboriosam sed, a rem possimus adipisci animi
        excepturi blanditiis labore delectus cum nemo quod aliquid modi vitae
        distinctio non consequuntur pariatur facere? Necessitatibus deserunt
        debitis quae saepe. Amet inventore totam, rem ad magni vitae autem.
        Maxime quod veniam atque dolorum tempore officiis corrupti vel saepe
        incidunt, deserunt eligendi ipsum neque impedit minus explicabo at
        perspiciatis doloremque totam sint modi reprehenderit voluptatibus
        asperiores unde? Labore iste blanditiis consectetur molestias fugiat
        quisquam ipsum nisi reiciendis totam dolore molestiae illum, aliquam
        ipsa quos dolores voluptates, accusantium incidunt nihil adipisci
        quibusdam? Corporis, commodi accusamus eveniet eius ad maxime quam
        dolorem quae nisi est harum iusto voluptatum tenetur nostrum! Dicta
        dolores mollitia autem doloribus voluptas non incidunt, quasi illum cum
        eligendi nostrum at rem nihil totam atque alias dignissimos veniam ab,
        reprehenderit nam praesentium ipsum repellat laudantium? Minima
        architecto iure natus sunt tempore, mollitia itaque. Ex aperiam saepe
        magni facere? Hic in amet, suscipit nisi dolorem ipsa. Excepturi saepe,
        incidunt natus vel nisi porro deserunt eos, hic necessitatibus quisquam
        nemo sequi maxime temporibus. Molestiae fuga ratione minima nulla porro
        eos culpa commodi quisquam aperiam eum nihil, nostrum enim quasi odio!
        Ipsam eaque velit culpa, corporis dolor quasi quam quia nisi laborum
        fugit sint! Porro aperiam accusantium libero sit sint voluptatem esse
        qui animi quas ipsam, eligendi magnam quos temporibus cum, placeat
        inventore in veniam reiciendis? Officia corporis exercitationem repellat
        architecto impedit libero asperiores. Architecto quam inventore, nam
        exercitationem aliquam recusandae eius ipsa laudantium facere aliquid
        vel repellat deleniti minus. Commodi, in! Commodi sint reiciendis quos
        quo dignissimos, dolorem quam voluptatibus, debitis quisquam optio
        recusandae tenetur placeat neque. Saepe, iusto? Necessitatibus
        accusantium consequatur ratione minus reiciendis, doloremque assumenda!
        Consectetur commodi quidem, eaque, minima nisi dignissimos ab,
        laudantium ipsa cupiditate quaerat adipisci itaque aperiam beatae quae?
        Fugiat totam dignissimos incidunt quasi esse, est, veniam nihil
        consequatur delectus nesciunt excepturi rem at optio ipsum qui eum quis.
        Nam laborum delectus possimus eum ullam sit deleniti, accusamus sequi
        neque. Quaerat qui, asperiores obcaecati, voluptatem nostrum quia beatae
        aliquid maiores saepe, commodi nemo sit odio temporibus. Minus totam
        similique itaque nihil fuga maxime, rerum natus ratione, illo eligendi
        quaerat exercitationem praesentium incidunt commodi voluptatum, harum
        reiciendis! Accusamus a sint exercitationem ipsum harum saepe. Quos
        atque magni quasi aspernatur fugit sapiente repudiandae voluptates
        voluptate quam? Sint aliquid voluptate expedita quaerat, quo sapiente
        magni accusantium possimus id eaque cumque culpa itaque libero, ab
        officia voluptates? Consequatur quo nemo, saepe, molestiae accusamus
        laudantium ipsum nostrum excepturi dolor illo minus esse sed! Officia
        adipisci officiis autem totam optio similique ratione quibusdam incidunt
        fuga est fugiat delectus at neque molestias, repudiandae dicta obcaecati
        necessitatibus sapiente veniam dolorem iste earum nihil in doloremque?
        Eaque officia officiis omnis quibusdam quos expedita, sunt illum,
        deleniti ea sapiente, commodi unde dolorum ab. Temporibus voluptates
        itaque, sit nobis a ut repudiandae culpa voluptas officiis error dolorum
        excepturi aspernatur sed rerum eos voluptatibus est praesentium
        voluptate corrupti dolore repellendus assumenda veritatis quisquam
        eveniet. Ratione labore dolorem magni debitis quas eos excepturi fugiat,
        eveniet minima quod quos consequatur consectetur, possimus porro ipsum
        repellendus. Nesciunt consequatur sed sunt, soluta eos pariatur
        repudiandae illo blanditiis! Cum, placeat saepe! Molestias aspernatur,
        eveniet mollitia quisquam natus qui fugit porro at beatae magni aperiam
        nam harum dolore, assumenda tempore sapiente quidem nihil accusantium
        tenetur veritatis! Laudantium, fuga eligendi? Illum quia ipsum minima
        fuga at laboriosam, vero enim quibusdam inventore dignissimos? Impedit
        beatae, dignissimos est voluptas modi commodi, ipsam, labore quae quasi
        quia porro. Magnam doloremque illum unde ipsam esse ea optio, suscipit
        molestias! Esse beatae necessitatibus, nihil eligendi aliquid vel sed
        quaerat aspernatur non neque ratione, excepturi dicta ex architecto unde
        eos, amet qui illo aliquam alias inventore corrupti quas ipsam. At ea id
        quisquam fugiat error illo, pariatur itaque ipsam animi in placeat
        inventore hic. Similique officia qui dolore beatae optio illum error,
        consequuntur inventore, quod harum suscipit reiciendis quaerat! Vero
        nisi sint tempora, tenetur voluptas ab id quos? Temporibus, nam
        inventore vitae fugiat iste impedit labore facere quis dolorum aperiam
        dolor ad sint odit nulla saepe cumque corporis id. Assumenda pariatur
        repellendus nulla recusandae atque? Ducimus eveniet voluptatem delectus
        dignissimos impedit, exercitationem, dolores praesentium nemo laborum
        incidunt aliquam. Deleniti assumenda, harum fuga tenetur laudantium
        consequatur, laboriosam, distinctio cum exercitationem perferendis
        sapiente. Reprehenderit iusto perferendis enim? Facere debitis quasi
        est, exercitationem molestias maiores dolore quod aliquam aperiam modi
        magnam asperiores eaque atque. Explicabo illum maiores assumenda facere
        quasi ullam earum, eum a magni. Iusto dicta sunt saepe numquam
        perferendis nobis vel in necessitatibus, quae adipisci debitis,
        accusantium minus est reprehenderit officia illum. Sit quo et quos
        provident esse id quam tempora, corporis illo! Odit id culpa magnam
        error, itaque suscipit nam eveniet maiores optio! Provident error
        ratione adipisci quae?
      </div>
    </div>
  );
};

export default observer(HomePage);

import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withMoviesList from "./with-movies-list.js";
import MoviesList from "../../components/movies-list/movies-list.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

const Movies = [
  {
    id: 0,
    title: `Aviator`,
    smallPoster: `img/aviator.jpg`,
    genre: `Drama`,
    year: 2004,
    runTime: `1h 39m`,
    bigPoster: `img/aviator.jpg`,
    cover: `img/aviator.jpg`,
    ratingScore: `7,5`,
    ratingCount: 121697,
    backgroundColor: `#AABBCC`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    directors: [`Мартин Скорсезе`],
    starrings: [`Леонардо ДиКаприо`, `Кейт Бланшетт`, `Мэтт Росс`, `Джон Си Райли`, `Алан Алда`, `Кейт Бекинсейл`, `Алек Болдуин`, `Иэн Холм`, `Адам Скотт`, `Дэнни Хьюстон`],
    descriptions: [
      `Получив от отца небольшую фабрику, Говард Хьюз превратил ее в гигантское, фантастически прибыльное предприятие. Став владельцем огромной кинокомпании, он снял самый дорогой для своего времени фильм и покорил сердца прелестнейших голливудских актрис.`,
      `Ему принадлежали самые престижные казино Лас-Вегаса и он установил рекорд скоростных полетов, приобрел вторую по величине коммерческую авиакомпанию…`,
      `Деньги жгут сердце Хьюза, они не дают ему покоя, а душа его рвется ввысь. Только там, на высоте нескольких тысяч метров он счастлив по-настоящему. Только там, где все решает лишь мастерство пилота и Бог, ничто не ценится так дорого, как верность и честь.`
    ],
  },
  {
    id: 1,
    title: `Bohemian rhapsody`,
    smallPoster: `img/bohemian-rhapsody.jpg`,
    genre: `Drama`,
    year: 2018,
    runTime: `2h 30m`,
    bigPoster: `img/bohemian-rhapsody.jpg`,
    cover: `img/bohemian-rhapsody.jpg`,
    ratingScore: `7,9`,
    ratingCount: 284651,
    backgroundColor: `#AABBCC`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    directors: [`Брайан Сингер`],
    starrings: [`Рами Малек`, `Люси Бойнтон`, `Гвилим Ли`, `Бен Харди`, `Джозеф Маццелло`, `Эйдан Гиллен`, `Аллен Лич`, `Том Холландер`, `Майк Майерс`, `Аарон МакКаскер`],
    descriptions: [
      `Чествование группы Queen, их музыки и их выдающегося вокалиста Фредди Меркьюри, который бросил вызов стереотипам и победил условности, чтобы стать одним из самых любимых артистов на планете.`,
      `Фильм прослеживает головокружительный путь группы к успеху благодаря их культовым песням и революционному звуку, практически распад коллектива, поскольку образ жизни Меркьюри выходит из-под контроля, и их триумфальное воссоединение накануне концерта Live Aid, ставшим одним из величайших выступлений в истории рок-музыки.`,
    ],
  },
  {
    id: 2,
    title: `Johnny english`,
    smallPoster: `img/johnny-english.jpg`,
    genre: `Comedy`,
    year: 2011,
    runTime: `1h 50m`,
    bigPoster: `img/johnny-english.jpg`,
    cover: `img/johnny-english.jpg`,
    ratingScore: `6,5`,
    ratingCount: 34786,
    backgroundColor: `#AABBCC`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    directors: [`Оливер Паркер`],
    starrings: [`Роуэн Эткинсон`, `Джиллиан Андерсон`, `Доминик Уэст`, `Розамунд Пайк`, `Дэниэл Калуя`, `Марк Иванир`, `Берн Горман`, `Жозефин де ла Буме`, `Тим Макиннерни`, `Пик Сен Лим`],
    descriptions: [
      `Действие фильма разворачивается через 8 лет после событий предшествующего фильма и с тех пор карьера сэра Джонни Инглиша ухудшается.`,
      `За 5 лет до начала фильма его направили с заданием в Мозамбик, но миссия пошла ужасно плохо. С тех пор он живёт в пещере в горах Тибета, прячась ото всех из-за стыда, сожалений и обвинений в провале миссии.`,
      `Фильм начинается, когда герой находится на крайне низком моральном уровне, пока ему не дают ещё один шанс. Британская разведка МИ-7 снова нуждается в нём и ей надо вернуть агента, чтобы тот сорвал заговор группы киллеров, планирующих убить китайского премьер-министра.`,
    ],
  },
  {
    id: 3,
    title: `Moonrise kingdom`,
    smallPoster: `img/moonrise-kingdom.jpg`,
    genre: `Fantasy`,
    year: 2012,
    runTime: `2h 10m`,
    bigPoster: `img/moonrise-kingdom.jpg`,
    cover: `img/moonrise-kingdom.jpg`,
    ratingScore: `8,9`,
    ratingCount: 240,
    backgroundColor: `#AABBCC`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    directors: [`Уэс Андерсон`],
    starrings: [`Брюс Уиллис`, `Эдвард Нортон`, `Билл Мюррей`, `Фрэнсис МакДорманд`, `Джаред Гилман`, `Кара Хэйуорд`, `Боб Бэлабан`, `Тильда Суинтон`, `Джейсон Шварцман`, `Харви Кейтель`],
    descriptions: [
      `60-е годы XX века. Пара влюблённых подростков, живущих на острове в Новой Англии, убегает из-под присмотра взрослых.`,
      `Сэм Шакаски — бойскаут, сирота, от которого отказались приемные родители, из-за своего непростого характера ставший изгоем среди других бойскаутов, и Сьюзи Бишоп — замкнутая двенадцатилетняя неуравновешенная девочка, живущая мечтами о волшебных мирах. После обнаружения пропажи местный шериф начинает расследование, а вожатый лагеря бойскаутов организует поисковый отряд.`,
    ],
  },
  {
    id: 4,
    title: `No country for old men`,
    smallPoster: `img/no-country-for-old-men.jpg`,
    genre: `Action`,
    year: 2007,
    runTime: `1h 25m`,
    bigPoster: `img/no-country-for-old-men.jpg`,
    cover: `img/no-country-for-old-men.jpg`,
    ratingScore: `7,7`,
    ratingCount: 139424,
    backgroundColor: `#AABBCC`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    directors: [`Итан Коэн, Джоэл Коэн`],
    starrings: [`Томми Ли Джонс`, `Джош Бролин`, `Хавьер Бардем`, `Келли Макдоналд`, `Вуди Харрельсон`, `Бет Грант`, `Гаррет Диллахант`, `Тесс Харпер`, `Бэри Корбинр`, `Стивен Рут`],
    descriptions: [
      `Обычный работяга обнаруживает в пустыне гору трупов, грузовик, набитый героином, и соблазнительную сумму в два миллиона долларов наличными. Он решает взять деньги себе, и результатом становится волна насилия, которую не может остановить вся полиция Западного Техаса.`,
    ],
  },
  {
    id: 5,
    title: `Orlando`,
    smallPoster: `img/orlando.jpg`,
    genre: `Fantasy`,
    year: 1992,
    runTime: `1h 30m`,
    bigPoster: `img/orlando.jpg`,
    cover: `img/orlando.jpg`,
    ratingScore: `7,1`,
    ratingCount: 6058,
    backgroundColor: `#AABBCC`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    directors: [`Салли Поттер`],
    starrings: [`Тильда Суинтон`, `Билли Зейн`, `Лотер Блюто`, `Джон Вуд`, `Шарлотт Валандре`, `Хиткоут Уильямс`, `Квентин Крисп`, `Джимми Соммервиль`, `Джон Ботт`, `Элейн Бенэм`],
    descriptions: [
      `Основанный на романе Вирджинии Вулф, фильм начинается в Лондоне 17-го столетия. Орландо — юноша-аристократ, гермафродитный по моде того времени и серьезно настроенный превратить жизнь, о которой он знает так мало, в искусство, о котором он знает еще меньше.`,
      `Орландо привлекает внимание стареющей королевы Елизаветы I, и ее величество приказывает ему не взрослеть и не стареть. Орландо подчиняется, необъяснимым образом оставаясь розовощеким красавцем, несмотря на то, что проходят века. Романтик до мозга костей, Орландо мучительно страдает от безответной любви к очаровательной русской княжне Саше; когда он находит ее фальшивой, то выпрашивает на долгий срок должность посла Англии в Аравии.`,
      `В один прекрасный день Орландо засыпает глубоким сном, а когда просыпается, то обнаруживает в себе чудесным образом произошедшую перемену пола. Приключения Орландо продолжаются, и она провожает столетия в развлечениях, отказываясь вести себя иначе, так как теперь он — женщина.`,
    ],
  },
  {
    id: 6,
    title: `Pulp fiction`,
    smallPoster: `img/pulp-fiction.jpg`,
    genre: `Action`,
    year: 1994,
    runTime: `1h 55m`,
    bigPoster: `img/pulp-fiction.jpg`,
    cover: `img/pulp-fiction.jpg`,
    ratingScore: `8,6`,
    ratingCount: 454261,
    backgroundColor: `#AABBCC`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    directors: [`Квентин Тарантино`],
    starrings: [`Джон Траволта`, `Сэмюэл Л. Джексон`, `Брюс Уиллис`, `Ума Турман`, `Винг Реймз`, `Тим Рот`, `Харви Кейтель`, `Квентин Тарантино`, `Питер Грин`, `Аманда Пламмер`],
    descriptions: [
      `Двое бандитов Винсент Вега и Джулс Винфилд ведут философские беседы в перерывах между разборками и решением проблем с должниками криминального босса Марселласа Уоллеса.`,
      `В первой истории Винсент проводит незабываемый вечер с женой Марселласа Мией. Во второй рассказывается о боксёре Бутче Кулидже, купленном Уоллесом, чтобы сдать бой. В третьей истории Винсент и Джулс по нелепой случайности попадают в неприятности.`,
    ],
  },
  {
    id: 7,
    title: `War of the worlds`,
    smallPoster: `img/war-of-the-worlds.jpg`,
    genre: `Fantasy`,
    year: 2005,
    runTime: `1h 28m`,
    bigPoster: `img/war-of-the-worlds.jpg`,
    cover: `img/war-of-the-worlds.jpg`,
    ratingScore: `7,0`,
    ratingCount: 151728,
    backgroundColor: `#AABBCC`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    directors: [`Стивен Спилберг`],
    starrings: [`Том Круз`, `Дакота Фаннинг`, `Миранда Отто`, `Джастин Чатвин`, `Тим Роббинс`, `Рик Гонсалес`, `Юл Васкес`, `Ленни Венито`, `Лиза Энн Уолтер`, `Энн Робинсон`],
    descriptions: [
      `Никто не поверил бы в начале 21 столетия, что за всем происходящим на Земле зорко и внимательно следят существа более развитые, чем человек; что в то время, как люди занимались своими делами, их исследовали и изучали.`,
      `С бесконечным самодовольством сновали люди по всему земному шару, занятые своими делишками, уверенные в своей власти над материей. А между тем через бездну пространства на Землю смотрели глазами полными зависти, существа с высокоразвитым, холодным, бесчувственным интеллектом, и медленно, но верно вырабатывали свои враждебные нам планы…`,
    ],
  },
  {
    id: 8,
    title: `War of the worlds`,
    smallPoster: `img/war-of-the-worlds.jpg`,
    genre: `Fantasy`,
    year: 2005,
    runTime: `1h 28m`,
    bigPoster: `img/war-of-the-worlds.jpg`,
    cover: `img/war-of-the-worlds.jpg`,
    ratingScore: `7,0`,
    ratingCount: 151728,
    backgroundColor: `#AABBCC`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    directors: [`Стивен Спилберг`],
    starrings: [`Том Круз`, `Дакота Фаннинг`, `Миранда Отто`, `Джастин Чатвин`, `Тим Роббинс`, `Рик Гонсалес`, `Юл Васкес`, `Ленни Венито`, `Лиза Энн Уолтер`, `Энн Робинсон`],
    descriptions: [
      `Никто не поверил бы в начале 21 столетия, что за всем происходящим на Земле зорко и внимательно следят существа более развитые, чем человек; что в то время, как люди занимались своими делами, их исследовали и изучали.`,
      `С бесконечным самодовольством сновали люди по всему земному шару, занятые своими делишками, уверенные в своей власти над материей. А между тем через бездну пространства на Землю смотрели глазами полными зависти, существа с высокоразвитым, холодным, бесчувственным интеллектом, и медленно, но верно вырабатывали свои враждебные нам планы…`,
    ],
  }
];


configure({adapter: new Adapter()});

const MockComponentWrapped = withMoviesList(MoviesList);

it(`Should render 9 movies after pressing Show more button`, () => {

  const wrapper = mount(
      <Router history={history}>
        <MockComponentWrapped
          movies = {Movies}
          onMovieTitleClick = {() => {}}
        />
      </Router>
  );

  const button = wrapper.find(`button.catalog__button`);
  button.simulate(`click`, {});
  expect(wrapper.find(MockComponentWrapped).instance().state.renderedMoviesCount).toBe(9);
});

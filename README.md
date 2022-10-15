리액트를 다루는 기술을 참고하여 기술하였습니다.

페이지 주소를 정할때는 유동적인 값을 사용할 때도 존재한다.

url 파라미터 예시 : ?page=1&keyword=react
쿼리스트링 예시 : page=1&keyword=react


url파라미터는 주소의 경로에 유동적인 값을 넣는 형태이며, 뒷부분에? 문자 이후 key=value를 정의하며 &로 구분하는 형태이다.

url파라미터는 ID, 이름, 특정 데이터를 조회할때 사용
쿼리스트링은 키워드 검색, 페이지네이션, 정렬방식등 데이터 조회에 필요한 옵션을 전달할 때 사용


useParams()
url파라미터를 통해서 여러개의 페이지를 생성하고 싶을때, useParams()를 사용할수 있다.

단순하게 생각했을때, 여러개의 페이지가 나눠져잇다고 가정을 해본다.



메인페이지

<Route path="/detail/:id" element={<Detail shoes={shoes}/>}/>
라는 페이지를 나눴을때, :id라는것이 url 파라미터이다.



function Detail(props){

let {id} = useParams();

return (
	<>
		<div>
			<h4 className='상품1'>{props.상품{id}.title}</h4>
			<p>{props.상품{id}.content}</p>
			<p>{props.상품{id}.price}</p>
		</div>
	</>
)}
라는 detail 페이지가 존재할 때,

useParams()를 사용하게 되면 아까 위에서 작성했던 :id인 url파라미터가 해당 데이터로 들어가게 된다.

이것을 새로운 변수에 저장하여 다음과 같이 작성하여 파라미터를 보내줄수 있다.

이를 통해서 어떤 페이지에 어떤 데이터가 들어갈지를 정해줄수 있는것이 useParams()이다.



쿼리스트링
쿼리스트링이란 url에서 물음표 다음으로 오는 것들을 의미한다.

http://www.inflearn.com/course?order=seq&skill=python3
라는 url이 존재할때 ? 물음표 뒤에 order=seq&skill=python3이 쿼리스트링이 되는것.

쿼리스트링을 나누는 방법은 &를 쓰면 된다.

이러한 각 페이지의 쿼리스트링을 반환할때는 useLocation이라는 훅을 사용하면 된다.

useLocation
useLocation()은 앞서 나왔던 useParams()와 동일하게 현재 페이지의 쿼리스트링이 반환된다.

작성할때는 useParams()와 동일하게 작성하면 사용가능

const location = useLocation();
반환값이 location이기때문에 다양한 값을 사용할수 있다.

.pathname : 현재 주소의 경로(쿼리스트링 제외 ?앞의값)
search : 맨앞에 ? 문자를 포함한 쿼리스트링 값
state : 페이지로 이동할때 임의로 넣을수 있는 상태값
key : location의 고유값, 초기에는 default이며 페이지가 변경될 때 마다 고유의값이 생성됨.


만일 location.search를 받는다면

<p>쿼리스트링 : {location.search}</p>

결과는 다음과 같이 나올수 있다.

쿼리스트링 : ?detail=true&mode=1
이처럼 값이 나오지만, 이는 직접 ?와 &를 분리한후 key와 value를 파싱해줘야하는 번거로움이 존재한다.

이를 리액트에서는 useSearchParams라는 훅으로 해결하엿다.



useSearchParams()
useSearchParams는 다음과 같이 사용한다.

const [searchParams, setSearchParams]=useSearchParams();
useSearchParams는 get()과 set()을 사용할수 있다.



get()

const id = searchParams.get('id');
const mode = searchParams.get('mode');
와같이 get을 이용하여 원하는 값을 가지고 올수 잇다.

하지만 주의 해야하는점은 항상 문자열만 조회하기 때문에 boolean type인 ture나 false를 비교할때도 꼭 “”를 작성해야하며, 숫자를 다룬다면 parseInt를 해줘야 한다.



set()

파라미터의 값을 추가하거나, 변경할때는 set()함수를 사용하게 된다.

useState()와 동일하게 setSearchParams를이용해서 searchParams값을 변경해준다.




Uploaded by N2T
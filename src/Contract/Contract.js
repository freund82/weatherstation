import styled from "styled-components"
import { useState } from "react";

const TextBlock=styled.h5`
    text-align:center;
`;

const PBlock=styled.p`
    text-align:justify;
`;

const PBlockRight=styled.p`
    text-align:right;
`;
const TextInput=styled.input`
    border:none;
    background:lightgreen;
    font-family: "Times New Roman", Times, serif;
    font-size:13px;
    text-align: center;
    padding:0;
`;



function Contract(){

    let [companyNameWidth, companyWidthValue]=useState(50)

    let [manager, managerWidthValue]=useState(30)

    

    function addRow(){
        let addR=document.querySelector("#Row")
        addR.after(addR.cloneNode(true))
    }
    function addTourists(){
        let addT=document.querySelector("#touristRow")
        addT.after(addT.cloneNode(true))
    }

    function removeBase(){
        let remove=document.querySelector("#base")
        remove.classList.add("base")
    }
    
    return(
        <div>
        <TextBlock>
            ДОГОВОР <TextInput type="text" style={{textAlign:"left", width:"53px"}} placeholder="21536521"></TextInput><select id="Agency"><option>-НВ</option><option>-АВ</option><option>-ТМ</option></select><br></br>КОРПОРАТИВНОГО ОБСЛУЖИВАНИЯ
        </TextBlock>
            <div id="cityDate" style={{paddingLeft:"40px", paddingRight:"20px", display:"flex", justifyContent:"space-between", margin:"10px"}}>
                <span style={{fontSize:"13px"}}>г. Москва</span><span><TextInput type="text" style={{textAlign:"center", width:"95px"}} placeholder="01 января 2022 г."></TextInput></span>
            </div>
            <PBlock>
            Общество с ограниченной ответственностью Юридическое агентство «Бизнес и туризм», использующий торговый знак TEZTOUR на основании сублицензионного договора <span><select style={{backgroundColor:"yellow"}} size="1"><option>№ 16/21М</option><option>№ 17/21М</option><option>№ 18/21М</option></select></span> от 01 июня 2021г., именуемое в дальнейшем «Исполнитель», в лице Генерального директора Михайловой Ирины Евгеньевны, действующей  на основании Устава, с одной стороны,  и  
                <TextInput type="text" style={{textAlign:"left"}} size={companyNameWidth} onChange={event => companyWidthValue(event.target.value.length)} placeholder="ООО Транспортная компания"></TextInput>
                <span><select style={{backgroundColor:"yellow"}} size="1"><option>именуемое</option><option>именуемый</option><option>именуемая</option></select></span> в дальнейшем «Заказчик», <span id="base">в лице <TextInput type="text" size={manager} onChange={event => managerWidthValue(event.target.value.length)} placeholder="Генерального директора,"></TextInput><span><select style={{backgroundColor:"yellow"}} size="1"><option>действующего</option><option>действующей</option></select></span> на основании Устава,</span><button id="baseButton" type="button" onClick={removeBase}>Удалить Устав</button>
                с другой стороны, далее именуемые Стороны, заключили настоящий Договор о нижеследующем.
            </PBlock>
            <TextBlock>
            1.	ПРЕДМЕТ ДОГОВОРА
            </TextBlock>
                <PBlock >
                1.1. По настоящему Договору Исполнитель оказывает Заказчику на возмездной основе услуги по организации  деловых встреч, поездок и иных корпоративных мероприятий, включая визовое сопровождение, бронирование отелей, билетов и пр. Перечень оказываемых услуг определяется в каждом конкретном случае на основании согласованной заявки Заказчика. 
                </PBlock>
               
                <TextBlock>
                2. ОБЯЗАТЕЛЬСТВА ИСПОЛНИТЕЛЯ
                </TextBlock>
                <PBlock >
                2.1. Исполнитель обязуется на основании Заявки Заказчика предоставить услуги, оговоренные в Заявке Заказчика, в соответствии с условиями настоящего Договора и с требованиями по качеству оказываемых услуг, классификацией и стандартами, принятыми в стране пребывания, на основании информации предоставленной Исполнителем. 
                </PBlock>
                <PBlock >
                2.2. Исполнитель обязуется на основании Заявки Заказчика, информировать Заказчика о возможности оказания услуг в течение 2-х рабочих дней после получения Заявки и выставить Счет на оплату.
                </PBlock>
                <PBlock>
                В случае аннулирования Заказчиком Заявки, для Заказчика со дня подачи Заявки наступают последствия, указанные в п. 5.2. настоящего Договора. Заявки и Аннуляции (за исключением не оплаты счета Исполнителя) принимаются только в письменной форме.
                </PBlock>
                <PBlock>
                2.3. Обязанность Исполнителя на предоставление услуг Заказчику возникает с момента поступления денежных средств на расчетный счет или в кассу Исполнителя, согласно Счета на оплату соответствующей Заявки. Выставленный Счет действителен для оплаты в течение 2 (двух) банковских дней со дня его выставления.
                </PBlock>
                <PBlock>
                2.4. В случае задержки, отмены, изменения даты или условий оказания услуг по настоящему договору Исполнитель обязан незамедлительно проинформировать Заказчика о вышеуказанных обстоятельствах, указав о них в оперативной информации Исполнителя на своем сайте.
                </PBlock>
                <TextBlock>
                3. ОБЯЗАТЕЛЬСТВА ЗАКАЗЧИКА
                </TextBlock>
                <PBlock >
                    3.1. Заказчик обязан своевременно оплачивать услуги Исполнителя в соответствии с условиями настоящего договора. Полученный от Исполнителя Счет должен быть оплачен в течение 2 (двух) банковских дней, иначе Заявка Заказчика считается не согласованной сторонами.
                </PBlock>
                <PBlock >
                3.2. Заказчик обязан следить за оперативной информацией, публикуемой Исполнителем на сайте.
                </PBlock>
                <PBlock >
                3.3. Заказчик обязан своевременно предоставить Исполнителю все документы и информацию, необходимые для оказания услуг по Заявке. 
                </PBlock>
                <PBlock>
                3.4. Заказчик обязуется после оплаты Счета своевременно получить от Исполнителя все документы, являющиеся результатом оказания услуг.
                </PBlock>
                <PBlock>
                3.5. Заказчик обязан самостоятельно информировать и организовывать непосредственных пользователей предоставляемых по настоящему договору услуг.
                </PBlock>
                <TextBlock>
                   
                4. ВЗАИМОРАСЧЕТЫ СТОРОН
                </TextBlock>
                <PBlock > 
                4.1. На основании Заявки Заказчика Исполнитель рассчитывает стоимость заявленных услуг и выставляет счет на оплату. 
	                Стоимость оказываемых Исполнителем услуг, указывается без учета НДС. Исполнитель является субъектом малого предпринимательства, применяющим упрощенную систему налогообложения учета и отчетности (глава 26.2 Налогового кодекса РФ), в связи с этим,  в расчетных и первичных документах сумма НДС  не выделяется, счета-фактуры не выписываются. 
                </PBlock>
                <PBlock >
                4.2. Заказчик, в случае согласия с выставленным счетом, обязан в течение 2 (двух) банковских дней оплатить его в полном объеме и немедленно известить об этом Исполнителя.
                </PBlock>
                <PBlock >
                В случае подачи Заявки в срок менее 2 (двух) банковских дней до начала оказания услуг, оплата должна быть произведена в течение суток после выставления Исполнителем счета. 
                </PBlock>
                <PBlock >
                Оплата считается произведенной в момент поступления денежных средств на счет Исполнителя.
                </PBlock>
                <PBlock >
                4.3. Оплата услуг осуществляется в рублях путем перечисления денежных средств на банковский счет Исполнителя согласно выставленного Исполнителем счета. Все расходы Заказчика, связанные с перечислением денежных средств Исполнителю, относятся на счет Заказчика.
                </PBlock>
                <PBlock >
                4.4. Заказчик имеет право перечислить на счет Исполнителя денежные средства в качестве предоплаты за будущие услуги, из которых будут вычитаться денежные средства, причитающиеся Исполнителю за оказанные услуги. В этом случае, подтверждением возникших правоотношений по оказанию услуг является Заявка и Счет на ее оплату, после чего у сторон возникают соответствующие гражданско-правовые отношения.
                </PBlock>
                <PBlock >
                Остаток денежных средств, перечисленных Заказчиком в счет будущих услуг, по требованию Заказчика возвращается в течение трех банковских дней после подписания Сторонами акта-сверки взаиморасчетов по оказанным услугам.
                </PBlock>
                <TextBlock>
                5. ОТВЕТСТВЕННОСТЬ СТОРОН
                </TextBlock>
                <PBlock>
                5.1. За несоблюдение условий настоящего Договора стороны несут ответственность в соответствии с действующим законодательством Российской Федерации.
                </PBlock>
                <PBlock>
                5.2. Если Заказчик отказывается от оплаченных услуг, то он компенсирует Исполнителю понесенные затраты. Порядок компенсации и выплаты неустойки в том случае, когда оказываемые услуги подпадают под понятие турпродукта, оговариваются в Приложении к настоящему Договору.
                </PBlock>
                <PBlock>
                5.3. В случае неисполнения Исполнителем обязательств по оказанию услуг по его вине, Исполнитель возмещает Заказчику полную стоимость неоказанных услуг.
                </PBlock>
                <PBlock>
                5.4. Исполнитель не несет ответственность за неоказание услуг по вине Заказчика (в том числе, несвоевременное получение документов, доведение информации до непосредственных пользователей).
                </PBlock>
                <TextBlock>
                    6. ОСОБЫЕ УСЛОВИЯ
                </TextBlock>
                <PBlock>
                6.1. Изменение Заказчиком количества туристов, типа номера, типа (системы) питания, отеля или сроков проживания в Заявке, является отказом Заказчика от оплаченной услуги и оформляется новой Заявкой. В этом случае для Заказчика наступают последствия, предусмотренные п. 5.2. настоящего Договора.
                </PBlock>
                <PBlock>
                6.2. Исполнитель не несет ответственности по проблемам, возникающим у пользователей Заказчика при прохождении, таможенного, санитарного, пограничного контроля и других служб, в том числе, если это связанно с неправильным оформлением или недействительностью паспорта клиента, виз, либо отсутствием записи о членах семьи в паспорт, отсутствием или неправильным оформлением разрешений или доверенностей на несовершеннолетних детей, либо при возникновении проблем, связанных с подлинностью документов, предоставляемых для оформления и организации туристической поездки. 
                </PBlock>
                <PBlock>
                6.3. Исполнитель не несет ответственности за задержку вылетов и прилетов, замену типа самолета, отмену рейсов, за доставку и сохранность багажа клиентов, а также при возникновении проблем, трудностей и последствий, возникающих у пользователя Заказчика, при утере или краже вещей, загранпаспорта, и других документов.
                </PBlock>
                <PBlock>
                6.4. Исполнитель в процессе оказания услуг имеет право заменить отель, указанный в Подтверждении Заявки или Счете на оплату, на аналогичный либо более высокой категории. Положение данного пункта должно быть в обязательном порядке доведено Заказчиком в письменном виде до каждого пользователя Заказчика. 
                </PBlock>
                <TextBlock>
                7. ПРОЧИЕ УСЛОВИЯ
                </TextBlock>
                <PBlock>
                7.1. Настоящий Договор составлен в двух аутентичных экземплярах, вступает в силу с момента подписания его обеими Сторонами. При отсутствии письменного извещения о расторжении за 30 суток до указанного срока, настоящий договор считается автоматически пролонгированным на следующий календарный год.
                </PBlock>
                <PBlock>
                7.2. Любые изменения и дополнения к настоящему Договору вступают в силу с момента подписания их обеими Сторонами. В случае, если одна из сторон пожелает расторгнуть действующий договор, она обязана уведомить об этом другую сторону не менее чем за 30 календарных дней до даты расторжения. 
                </PBlock>
                <PBlock>
                7.3. Во всем том, что не урегулировано настоящим Договором Стороны руководствуются действующим законодательством Российской Федерации.
                </PBlock>
                <PBlock>
                7.4. Все споры по настоящему Договору решаются путем переговоров, а при невозможности достижения согласия передаются на рассмотрение в Арбитражный суд г. Москвы.
                </PBlock>

                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                   
                <TextBlock>
                8. РЕКВИЗИТЫ СТОРОН
                </TextBlock>
                <div style={{display:"flex", justifyContent:"space-between", fontSize:"13px"}}>
                    <div style={{width:"50%", border:"1px solid black", padding:"5px"}}>
                        ФИРМА: Общество с ограниченной ответственностью<br></br>
                        Юридическое агентство «Бизнес и Туризм»<br></br>
                        ИНН 7702330796 КПП 773101001<br></br>  
                        Юр. Адрес:<br></br>
                        121374, г.Москва, Можайское шоссе, д.2, пом. 9, этаж  1, комн. 20<br></br>
                        Факт.адрес: 
                        <select size="1" style={{backgroundColor:"yellow"}}>
                            <option>115184, г.Москва, Пятницкий переулок д.8 стр.1</option>
                            <option>115280, город Москва, улица Восточная, дом 11, корпус 1</option>
                            <option>121374 г.Москва Можайское шоссе д.2 пом.9 этаж.1 комн.20</option>
                        </select><br></br>
                        Телефон:<select size="1" style={{backgroundColor:"yellow"}}>
                            <option>+7 (495) 783-23-13</option>
                            <option>+7 (495) 783-23-00</option>
                            <option>+7 (495) 443-20-20</option>
                        </select><br></br>
                        р/с 40702810738000095449<br></br>
                        в  ПАО "СБЕРБАНК", г. Москва<br></br>  
                        к/с  30101810400000000225  БИК 044525225<br></br>

                        <p style={{marginTop:"20px", marginLeft:"0", textIndent:"0", fontSize:"13px"}}>
                        Генеральный директор ООО ЮА «Бизнес и Туризм»<br></br>
                        _________________________/И.Е. Михайлова
                        </p>
                    </div>
                    <div contentEditable="true" style={{width:"50%", border:"1px solid black", padding:"5px", background:"lightgreen"}}>
                    ЗАКАЗЧИК:<br></br>
                        Юр. Адрес:<br></br>
                        ИНН      КПП<br></br>
                        Факт.адрес:<br></br>
                        Телефон:<br></br>
                        р/с<br></br>
                        к/с<br></br>
                        БИК <br></br>
                        
                        <br></br>
                        <br></br>
                       
                        <p style={{marginLeft:"0", textIndent:"0", fontSize:"13px"}}>
                        _________________________________<br></br>
                        _________________________/</p>
                    </div>
                </div>

                <br></br>

                    <PBlockRight id="addList">
                    Приложение N 1
                    </PBlockRight>
                    <PBlockRight>
                    к  Договору корпоративного обслуживания
                    </PBlockRight>
                    <PBlockRight>
                    <TextInput type="text" style={{textAlign:"left", width:"53px"}} placeholder="21536521"></TextInput><select id="Agency"><option>-НВ</option><option>-АВ</option><option>-ТМ</option></select>
                    </PBlockRight>
                    <TextBlock>
                        Заявка на бронирование
                    </TextBlock>
                    <PBlock>
                        В организацию поездки входит:
                    </PBlock>
                    <PBlock>
                        Бронирование услуг перевозки по маршруту:
                    </PBlock>
                    <table border="1" cellSpacing={0}>
                        <tr>
                            <th style={{width:"60%"}}>Маршрут</th>
                            <th>Класс обслуживания</th>
                            <th>Дата</th>
                        </tr>
                        <tr>
                            <td><input className="info" type="text"></input></td>
                            <td><input className="info" type="text"></input></td>
                            <td><input className="info" type="date"></input></td>
                        </tr>
                    </table>
                    <br></br>
                    <PBlock>
                    Бронирование проживания:
                    </PBlock>
                    <br></br>
                    <table border="1" cellSpacing={0}>
                        <tr>
                            <th style={{width:"30%"}}>Отель</th>
                            <th style={{width:"25%"}}>Период проживания</th>
                            <th>Тип номера</th>
                            <th style={{width:"5%"}}>Вид размещения</th>
                            <th>Пансион</th>
                        </tr>
                        <tr id="Row">
                            <td><input className="info" type="text"></input></td>
                            <td><input className="info" style={{width:"48%", textAlign:"right"}} type="text"></input>-<input className="info" style={{width:"48%"}} type="text"></input></td>
                            <td><input className="info" type="text"></input></td>
                            <td><input className="info" type="text"></input></td>
                            <td><input className="info" type="text"></input></td>
                        </tr>
                    </table>
                    <button className="newRow" type="button" onClick={addRow}>Добавить строку</button>
                    <PBlock>
                        <br></br>
                        Трансфер (перевозка наземным транспортом):
                    </PBlock>
                    <table border="1" cellSpacing={0}>
                        <tr>
                            <th style={{width:"80%"}}>Маршрут</th>
                            <th style={{width:"20%"}}>Вид (индивидуальный, групповой, и др.)</th>
                        </tr>
                        <tr className="Row">
                            <td>Трансфер "аэропорт-отель-аэропорт"</td>
                            <td><input className="info" type="text"></input></td>
                        </tr>
                    </table>
                    <table>
                        <tr className="rowTable">
                            <td className="rowTable" style={{width:"80%", textIndent:"10px"}}>Экскурсионная программа</td>
                            <td className="rowTable" style={{width:"20%"}}><input className="info" type="text"></input></td>
                        </tr>
                        <tr className="rowTable">
                            <td className="rowTable" style={{width:"80%", textIndent:"10px"}}>Встреча и проводы русскоговорящим гидом</td>
                            <td className="rowTable" style={{width:"20%"}}><input className="info" type="text"></input></td>
                        </tr>
                        <tr className="rowTable">
                            <td className="rowTable" style={{width:"80%", textIndent:"10px"}}>Визовая поддержка</td>
                            <td className="rowTable" style={{width:"20%"}}><input className="info" type="text"></input></td>
                        </tr>
                        <tr className="rowTable">
                            <td className="rowTable" style={{width:"80%", textIndent:"10px"}}>Медицинское страхование</td>
                            <td className="rowTable" style={{width:"20%"}}><input className="info" type="text"></input></td>
                        </tr>
                        <tr className="rowTable">
                            <td className="rowTable" style={{width:"80%", textIndent:"10px"}}>Страхование на случай отмены поездки или прерывания поездки<br></br>(страхование расходов от "невыезда")</td>
                            <td className="rowTable" style={{width:"20%"}}><input className="info" type="text"></input></td>
                        </tr>
                        <tr className="rowTable">
                            <td className="rowTable" style={{width:"80%", textIndent:"10px"}}>Другие услуги</td>
                            <td className="rowTable" style={{width:"20%"}}><input className="info" type="text"></input></td>
                        </tr>
                    </table>
                    <PBlock>
                        Список туристов:
                    </PBlock>
                    <table border="1" cellSpacing={0}>
                        <tr>
                            <th style={{width:"40%"}}>Фамилия, имя</th>
                            <th style={{width:"10%"}}>Дата рождения</th>
                            <th style={{width:"15%"}}>Серия, номер паспорта</th>
                            <th style={{width:"15%"}}>Дата выдачи паспорта</th>
                            <th style={{width:"15%"}}>Дата окончания действия паспорта</th>
                            <th style={{width:"5%"}}>Гражданство</th>
                        </tr>
                        <tr id="touristRow">
                            <td><input className="info" type="text"></input></td>
                            <td><input className="info" type="text"></input></td>
                            <td><input className="info" type="text"></input></td>
                            <td><input className="info" type="text"></input></td>
                            <td><input className="info" type="text"></input></td>
                            <td><input className="info" type="text"></input></td>
                        </tr>
                    </table>
                    <button className="newRow" type="button" onClick={addTourists}>Добавить строку</button>
                    <PBlock style={{fontWeight:"bold", textIndent:"0", textAlign:"left"}}>
                        Общая цена туристкого продукта составляет:<input style={{width:"500px", fontWeight:"bold"}} className="info" type="text"></input>
                    </PBlock>
                    <PBlock style={{fontWeight:"bold", textIndent:"0"}}>
                        Цена туристского продукта составляет:<input style={{width:"100px", fontWeight:"bold"}} className="info" type="text"></input>
                    </PBlock>
                    <PBlock>
                        С информацией о потребительских свойствах Туристского продукта, дополнительной информацией, указанной в настоящей Заявке на бронирование и в Договоре клиент ознакомлен в полном объеме.
                    </PBlock>
                    <br></br>
                    <PBlock style={{textIndent:"0"}}>
                        Клиент: <input style={{width:"300px"}} className="info" type="text"></input>
                    </PBlock>
                    <br></br>
                    <PBlock style={{textIndent:"0"}}>
                        Турагент: <input style={{width:"300px"}} className="info" type="text"></input>
                    </PBlock>
        </div>
        
    )
}

export default Contract
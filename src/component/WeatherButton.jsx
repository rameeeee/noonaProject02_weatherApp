import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, setCity, city}) => {
    /** Mini 과제1 memo
     * <Button variant="primary" onClick={() => {setCity('')}}>Current Location</Button>
    */    
    /** Mini 과제2 memo
     * e.target.value, index를 이용해보려 했으나, 
     * map에서 전체 변경되는 문제, 두 번 클릭해야 클래스가 변경되는 문제가 발생함
    */

    return (
        <div className="btn_wrap">
            <Button variant={`${city === '' ? "outline-primary" : "primary" }`} onClick={() => {setCity('')}}>Current Location</Button>
            {cities.map((item, index) => (
                <Button variant={`${city === item ? "outline-primary" : "primary"}`} key={index} onClick={() => {setCity(item)}}>{item}</Button>
            ))}
        </div>
    )
}

export default WeatherButton

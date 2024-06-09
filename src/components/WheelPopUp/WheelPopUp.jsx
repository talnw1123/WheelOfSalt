import React, { useRef, useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';
import './WheelPopUp.css';

Chart.register(...registerables, ChartDataLabels);

const WheelPopUp = ({ productId, onClose }) => {
  const wheelRef = useRef();
  const chartInstanceRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4400/api/getWheelData/${productId}`);
        const sortedData = response.data.sort((a, b) => a.minDegree - b.minDegree);
        setData(sortedData);
        renderWheel(sortedData);
        console.log('Fetched and sorted wheel data:', sortedData);
      } catch (error) {
        console.error('Error fetching wheel data:', error);
      }
    };

    fetchData();
  }, [productId]);

  const renderWheel = (wheelData) => {
    const labels = wheelData.map(item => item.name);
    const pieData = wheelData.map(item => item.maxDegree - item.minDegree);
    const pieColors = pieData.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(wheelRef.current, {
      plugins: [ChartDataLabels],
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            backgroundColor: pieColors,
            data: pieData,
          },
        ],
      },
      options: {
        responsive: true,
        animation: { duration: 0 },
        plugins: {
          tooltip: false,
          legend: { display: false },
          datalabels: {
            color: '#ffffff',
            formatter: (_, context) => context.chart.data.labels[context.dataIndex],
            font: { size: 24 },
          },
        },
      },
    });
    console.log('Rendered wheel with data:', wheelData);
  };

  const spinWheel = () => {
    const randomDeg = Math.floor(Math.random() * 360);
    console.log('Generated random degree:', randomDeg);

    const targetRotation = (360 - randomDeg + 90) % 360;
    const randomSpins = Math.floor(Math.random() * 4) + 3; // Random spins between 3 to 6
    const totalRotation = (randomSpins * 360) + targetRotation;
    let currentRotation = 0;

    console.log('Starting wheel spin with total rotation:', totalRotation);

    const rotationInterval = setInterval(() => {
      currentRotation += 5; // Adjust the speed of rotation here
      const rotationDegree = currentRotation % 360; // Normalize the rotation degree
      chartInstanceRef.current.options.rotation = rotationDegree;
      chartInstanceRef.current.update();

      if (currentRotation >= totalRotation) {
        clearInterval(rotationInterval);
        const selectedItem = getSelectedItem((rotationDegree + 90) % 360);
        if (selectedItem && selectedItem.information.length > 0) {
          const randomInfo = selectedItem.information[Math.floor(Math.random() * selectedItem.information.length)];
          alert(`Congrats! คุณได้รับ ${randomInfo}`);
          console.log('Spin complete. Selected item:', selectedItem, 'Random info:', randomInfo);
          updateItemInformation(selectedItem._id, randomInfo);
        } else {
          alert('No information available for the selected item.');
          console.log('No information available for the selected item:', selectedItem);
        }
      }
    }, 10);
  };

  const getSelectedItem = (rotationDegree) => {
    console.log('Determining value for rotation degree:', rotationDegree);
    for (let item of data) {
      if (rotationDegree >= item.minDegree && rotationDegree <= item.maxDegree) {
        console.log('Found matching item:', item);
        return item;
      }
    }
    console.log('No matching item found for rotation degree:', rotationDegree);
    return null;
  };

  const updateItemInformation = async (itemId, infoToRemove) => {
    try {
      const updatedItems = data.map(item => {
        if (item._id === itemId) {
          return {
            ...item,
            information: item.information.filter(info => info !== infoToRemove),
          };
        }
        return item;
      });

      await axios.post(`http://localhost:4400/api/deleteItemFromSpin/${productId}`, { items: updatedItems });
      console.log('Updated item information in MongoDB');
      // Update the local state to reflect the changes
      setData(updatedItems);
    } catch (error) {
      console.error('Error updating item information:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="wheel-popup">
      <div className="wheel-container">
        <div className="wheel-wrapper">
          <canvas ref={wheelRef}></canvas>
          <div className="pointer">
            <img src="https://media.discordapp.net/attachments/449929146072694795/1248849326655148042/arrow.png?ex=6665d1d1&is=66648051&hm=cb6ad227df2eb400777c11dfa46f252973e093e83dca30b4a17245c2117c1c5b&=&format=webp&quality=lossless" alt="pointer" />
          </div>
        </div>
        <button onClick={spinWheel}>Spin</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default WheelPopUp;

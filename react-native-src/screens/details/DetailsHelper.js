export const formatList = (listVideo) => {
    let eventVideoArray = [];
    if (Array.isArray(listVideo) && listVideo.length > 0) {
        for (let i = 0; i < listVideo.length; i++) {
            let {timeStart, timeEnd, cdnUrl} = listVideo[i]
            if (cdnUrl !== null) {
                //format data: [{date: '...', data:[{...}]}]
                let date = moment(Number(timeStart)).startOf('day')
                let indexDate = eventVideoArray.findIndex(item => date.isSame(Number(item.date), 'day'));

                let element = listVideo[i] || {};
                element.title = camera && camera.name + 'event' + i;
                element.subtitle = 'abc';
                element.date = Number(timeStart);
                if (indexDate === -1) {
                    eventVideoArray.push({
                        date: date,
                        data: [listVideo[i]]
                    })
                } else {

                    eventVideoArray[indexDate] &&
                    eventVideoArray[indexDate].data &&
                    eventVideoArray[indexDate].data.push(listVideo[i])
                }

            }
        }
    }
    return eventVideoArray
}

export const filterVideo = (listVideo) => {
    let eventVideoArray = [];
    if (Array.isArray(listVideo) && listVideo.length > 0) {
        for (let i = 0; i < listVideo.length; i++) {
            let { cdnUrl} = listVideo[i]
            if (cdnUrl !== null) {
                let el = listVideo[i];
                el.index = eventVideoArray.length;
                eventVideoArray.push(el)
            }
        }
        return eventVideoArray;
    }
    return eventVideoArray;
}
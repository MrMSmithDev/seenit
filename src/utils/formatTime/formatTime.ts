import { months } from '@utils/misc/index'

function formatTime(timePosted: Date): string {
  const formattedTime = `${timePosted
    .getHours()
    .toLocaleString(undefined, { minimumIntegerDigits: 2 })}:${timePosted
    .getMinutes()
    .toLocaleString(undefined, { minimumIntegerDigits: 2 })} 
      ${timePosted.getDate()} ${months[timePosted.getMonth()]} ${timePosted.getFullYear()}`
  return formattedTime
}

export default formatTime

import Screen from '../components/Screen'
import { alerts } from '../data/demo'

export default function Alerts() {
  return (
    <Screen title="Alerts">
      <div className="list">
        {alerts.map((item) => (
          <article className="alert-row" key={item.id}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
            <span>{item.time}</span>
          </article>
        ))}
      </div>
    </Screen>
  )
}

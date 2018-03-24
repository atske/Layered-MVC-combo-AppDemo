using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BrokerDemo
{
    class MessageBrokerDemo : IMessageBroker
    {
        //creating a field of the class type here, which i used later in the property 'Instance'
        private static MessageBrokerDemo _instance;

        //This is basically a dictionary with a list of receivers/subscribers and the message types they are attached to
        private readonly Dictionary<Type, List<Delegate>> _subscribers;

        //Property of the class type assigning the earlier field to a new instance of the class
        public static MessageBrokerDemo Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new MessageBrokerDemo();
                return _instance;
            }
        }

        //I created a constructer here to house the Dictionary defined earlier
        private MessageBrokerDemo()
        {
            _subscribers = new Dictionary<Type, List<Delegate>>();
        }

        //Now we get to the cool stuff, this is the source logic goes for getting a Publisher on board the system
        public void Publish<T>(object source, T message)
        {
            //No message, this is pointless..go back
            if (message == null || source == null)
                return;

            //No receivers who want a type T message, this is also pointless..go back
            if (!_subscribers.ContainsKey(typeof(T)))
            {
                return;
            }

            //Else
            var delegates = _subscribers[typeof(T)];
            //Redundant
            if (delegates == null || delegates.Count == 0) return;
            var payload = new MessagePayload<T>(message, source);
            foreach (var handler in delegates.Select
            (item => item as Action<MessagePayload<T>>))
            {
                Task.Factory.StartNew(() => handler?.Invoke(payload));
            }
        }

        //Next Cool Stuff is the receiver/Subscriber's end logic to get them on board the system
        public void Subscribe<T>(Action<MessagePayload<T>> subscription)
        {
            //assign delegates to recievers who want a specific message, if none exist...then create one
            var delegates = _subscribers.ContainsKey(typeof(T)) ?
                            _subscribers[typeof(T)] : new List<Delegate>();
            if (!delegates.Contains(subscription))
            {
                delegates.Add(subscription);
            }
            _subscribers[typeof(T)] = delegates;
        }
        
        //for receivers/subscribers who are too cool to be in here, logic to kick them out...politely
        public void Unsubscribe<T>(Action<MessagePayload<T>> subscription)
        {
            //if none exist, get back
            if (!_subscribers.ContainsKey(typeof(T))) return;

            var delegates = _subscribers[typeof(T)];
            if (delegates.Contains(subscription))
                delegates.Remove(subscription);
            if (delegates.Count == 0)
                _subscribers.Remove(typeof(T));
        }

        //last minute Clean wanted? happy to help
        public void Dispose()
        {
            _subscribers?.Clear();
        }
    }
}

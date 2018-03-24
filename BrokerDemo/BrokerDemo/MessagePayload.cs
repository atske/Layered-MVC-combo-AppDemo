using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BrokerDemo
{
    //This sample will hopefully have what i think a message payload should contain at the smallest level at least..  
    class MessagePayload<T>
    {
        //who sent the message aka source aka publisher, to be formal 
        public object Who { get; private set; }

        //what the message type is. it'll be used later to match with the receivers or subsribers
        public T What { get; private set; }


        //public DateTime When { get; private set; }
        public MessagePayload(T payload, object source)
        {
            Who = source; What = payload; //When = DateTime.UtcNow;
        }
    }
}
